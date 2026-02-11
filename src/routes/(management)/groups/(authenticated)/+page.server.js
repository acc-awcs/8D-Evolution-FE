import { MAILCHIMP_API_KEY } from '$env/static/private';
import { PUBLIC_BASE_URL, PUBLIC_SERVER_URL } from '$env/static/public';
import { FACILITATOR } from '$lib/constants';
import { AUTH_EMAIL_TEMPLATE } from '$lib/constants';
import { statusIsGood } from '$lib/helpers/general';
import Mailchimp from '@mailchimp/mailchimp_transactional';
import { error } from '@sveltejs/kit';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

const apiKey = MAILCHIMP_API_KEY;
const client = Mailchimp(apiKey ?? '');

export async function load({ cookies, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/groups`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in auth server load', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return data;
}

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			// Create a new group
			const sessionToken = cookies.get('sessionToken');
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/new-group`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${sessionToken}`
				}
			});

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				console.log('Error in auth server default', body);
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}

			const { group, userName, userEmail, adminEmails } = await response.json();

			// After a new group is created for/by a facilitator, send an email to the provided notification emails if applicable
			if (
				Array.isArray(adminEmails) &&
				adminEmails.length > 0 &&
				group.creatorRole === FACILITATOR
			) {
				const message = {
					template_name: AUTH_EMAIL_TEMPLATE,
					template_content: [
						{
							name: 'content',
							content: `
											<p>Heads up,</p>
											<p><strong>${userName}</strong> is getting ready for a Climate Wayfinding facilitation!</p>
											<p>If you'd like to reach out to them, here's their email: ${userEmail}</p>
											<p>Facilitation Details:</p>
											<ul>
												<li><strong>Organization - </strong>${group.organization}</li>
												<li><strong>Month - </strong>${group.month}</li>
												<li><strong>Year - </strong>${group.year}</li>
											</ul>
											<br/>
											<p><em>Sent from the Climate Wayfinding website. You can adjust the email preferences for any admin user on via the <a href="${PUBLIC_BASE_URL}/admin/users">Users</a> page.</em></p>
											<br/>
											<br/>
											`
						}
					],
					message: {
						from_email: 'info@allwecansave.earth',
						from_name: 'The All We Can Save Project',
						to: adminEmails.map((email) => ({
							email: email,
							name: ''
						})),
						subject: 'New Climate Wayfinding Group Created'
					}
				};

				const mailchimpResp = await client.messages.sendTemplate(message);
				if (Array.isArray(mailchimpResp)) {
					const result = mailchimpResp[0];
					if (result.status !== 'sent') {
						return fail(422, {
							success: false,
							message: result.reject_reason
						});
					}
				}
			}

			redirect(303, `/groups/g/${group._id}`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in auth server default:', error);
			return {
				success: false
			};
		}
	}
};
