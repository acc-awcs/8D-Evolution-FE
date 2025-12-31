import mailchimp from '@mailchimp/mailchimp_transactional';
import { env } from '$env/dynamic/private';
import * as EmailValidator from 'email-validator';
import { RESULTS_EMAIL_TEMPLATE } from '$lib/constants.js';

const apiKey = env.MAILCHIMP_API_KEY;
const client = mailchimp(apiKey ?? '');

export async function POST({ request }) {
	try {
		const { email, resultCode } = await request.json();

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
					<p>Thank you for spending some time with the 8 Dynamics of Climate Engagement!</p>
					<p>Your unique code is ...</p><p><strong style="font-size: 28px;">${resultCode}</strong></p>
					<p>Want to revisit your results page? View your 8 Dynamics Web with the link below:</p>
					<p><a href="${env.PUBLIC_BASE_URL}/results/${resultCode}" style="color: #303326; text-decoration: underline">Your 8-Dynamics of Climate Engagement Starting Point</a></p>
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
				subject: 'Your 8 Dynamics Results Code'
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
