import mailchimp from '@mailchimp/mailchimp_transactional';
import CryptoJS from 'crypto-js';
import mailchimpMarketing from '@mailchimp/mailchimp_marketing';
import * as EmailValidator from 'email-validator';
import { RESULTS_EMAIL_TEMPLATE } from '$lib/constants.js';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { MAILCHIMP_API_KEY } from '$env/static/private';
import { MAILCHIMP_NEWSLETTER_ID } from '$env/static/private';
import { MAILCHIMP_MARKETING_API_KEY } from '$env/static/private';

const apiKey = MAILCHIMP_API_KEY;
const client = mailchimp(apiKey ?? '');

mailchimpMarketing.setConfig({
	apiKey: MAILCHIMP_MARKETING_API_KEY,
	server: 'us1'
});

export async function POST({ request }) {
	try {
		const { email, resultCode, addToNewsletter } = await request.json();

		// check for valid email
		if (!EmailValidator.validate(email)) {
			return new Response(JSON.stringify({ error: `Invalid email` }), {
				status: 400
			});
		}

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

		const message = {
			template_name: RESULTS_EMAIL_TEMPLATE,
			template_content: [
				{
					name: 'content',
					content: `
					<p><b>Thanks for taking the 8 Dynamics Quiz! </b></p>
					<p>We hope it sheds some light on where you’re beginning this journey.</p>
					<p>Your unique code is:</p><p><strong style="font-size: 28px;">${resultCode}</strong></p>
					<p>At the end of your Climate Wayfinding journey, you’ll return to the 8 Dynamics Quiz to see what’s shifted. This code will let you compare your unique starting and ending “webs.”</p>
					<p>To revisit your results, simply click the link below.</p>
					<p><a href="${PUBLIC_BASE_URL}/results/${resultCode}" style="color: #303326; text-decoration: underline">Your 8 Dynamics Starting Point</a></p>
					<p>Please be sure to save this email.</p>
					<p>Wishing you a rich journey ahead!</p>
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
				subject: 'Climate Wayfinding: Your 8 Dynamics Code'
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
