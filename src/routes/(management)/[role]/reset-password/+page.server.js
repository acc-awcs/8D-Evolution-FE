import { MAILCHIMP_API_KEY } from '$env/static/private';
import { PUBLIC_BASE_URL, PUBLIC_SERVER_URL } from '$env/static/public';
import { ADMIN, AUTH_EMAIL_TEMPLATE } from '$lib/constants';
import { statusIsGood } from '$lib/helpers/general';
import Mailchimp from '@mailchimp/mailchimp_transactional';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

const apiKey = MAILCHIMP_API_KEY;
const client = Mailchimp(apiKey ?? '');

// Reset password
export const actions = {
	default: async ({ cookies, request }) => {
		try {
			// const data = await request.json();
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));
			const email = formData?.email;
			if (!email || email < 1) {
				return fail(422, {
					success: false,
					message: 'Email is required'
				});
			}

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/reset-password-token`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json'
				}
			});

			let role = 'presenter';

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				if (body.user.role === ADMIN) {
					role = ADMIN;
				}
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}

			const body = await response.json();

			const message = {
				template_name: AUTH_EMAIL_TEMPLATE,
				template_content: [
					{
						name: 'content',
						content: `
                <p>Use the link below to reset your password for the Climate Wayfinding 8 Dynamics tool. This link will expire in one hour.</p>
                <p><a href="${PUBLIC_BASE_URL}/${role}/reset-password/${body.token}" style="color: #303326; text-decoration: underline">Reset password</a></p>
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
					subject: 'Reset Your Password'
				}
			};

			const mailchimpResp = await client.messages.sendTemplate(message);
			if (Array.isArray(mailchimpResp)) {
				const result = mailchimpResp[0];
				if (result.status === 'sent') {
					redirect(303, `/${role}/reset-password/sent`);
				} else {
					return fail(422, {
						success: false,
						message: result.reject_reason
					});
				}
			}
			return fail(422, {
				success: false,
				message: "Couldn't complete reset password request"
			});
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred:', error);
			return {
				success: false
			};
		}
	}
};
