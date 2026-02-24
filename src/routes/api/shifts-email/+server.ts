import mailchimp from '@mailchimp/mailchimp_transactional';
import CryptoJS from 'crypto-js';
import mailchimpMarketing from '@mailchimp/mailchimp_marketing';
import * as EmailValidator from 'email-validator';
import { RESULTS_EMAIL_TEMPLATE } from '$lib/constants.js';
import { PUBLIC_BASE_URL } from '$env/static/public';
import {
	MAILCHIMP_API_KEY,
	MAILCHIMP_MARKETING_API_KEY,
	MAILCHIMP_NEWSLETTER_ID
} from '$env/static/private';

const apiKey = MAILCHIMP_API_KEY;
const client = mailchimp(apiKey ?? '');

mailchimpMarketing.setConfig({
	apiKey: MAILCHIMP_MARKETING_API_KEY,
	server: 'us1'
});

export async function POST({ request }) {
	try {
		const { email, resultCode, addToNewsletter } = await request.json();

		if (addToNewsletter) {
			try {
				const subscriberHash = CryptoJS.MD5(email.toLowerCase()).toString();
				const newsletterResp = await mailchimpMarketing.lists.setListMember(
					MAILCHIMP_NEWSLETTER_ID,
					subscriberHash,
					{ email_address: email, status_if_new: 'subscribed' }
				);
				console.log('Added to newsletter');
			} catch (e) {
				console.log('Something went wrong while updating mailchimp newsletter audience', e);
			}
		}

		// check for valid email
		if (!EmailValidator.validate(email)) {
			return new Response(JSON.stringify({ error: `Invalid email` }), {
				status: 400
			});
		}

		const message = {
			template_name: RESULTS_EMAIL_TEMPLATE,
			template_content: [
				{
					name: 'content',
					content: `
          <p>Thank you for returning to the 8 Dynamics of Climate Engagement at the close of this  <i>Climate Wayfinding</i> journey.</p>
          <p>You can view how you shifted here: <a href="${PUBLIC_BASE_URL}/results/${resultCode}" style="color: #303326; text-decoration: underline">Your 8 Dynamics Shifts</a></p>
          <p>This is a tool to return to again and again. It can be useful to self-assess when starting something new or after a key experience, to make shifts visible. You can use it alone or with others—in a class or team, for example. We hope you’ll find it to be a touchstone for your climate journey.</p>
          <p>Wishing you possibility, power, and joy in the work!</p>
          `
				}
			],
			message: {
				from_email: 'info@allwecansave.earth',
				from_name: 'The All We Can Save Project',
				to: [
					{
						email: email,
						name: ''
					}
				],
				subject: 'Your 8 Dynamics Shifts'
			}
		};

		const response = await client.messages.sendTemplate(message);
		if (Array.isArray(response)) {
			const result = response[0];
			if (result.status === 'sent') {
				return new Response(JSON.stringify({ success: true }), { status: 200 });
			} else {
				throw new Error(`${result.reject_reason}`);
			}
		}

		throw new Error(response.message);
	} catch (err) {
		return new Response(JSON.stringify({ error: `Failed to send email. ${err}` }), { status: 500 });
	}
}
