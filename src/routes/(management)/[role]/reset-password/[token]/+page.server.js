import { PUBLIC_SERVER_URL } from '$env/static/public';
import { ADMIN } from '$lib/constants.js';
import { statusIsGood } from '$lib/helpers/general';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

// Reset password
export const actions = {
	default: async ({ request, params }) => {
		try {
			// const data = await request.json();
			const formData = await request.formData();
			formData.append('resetToken', params.token);
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			if (!formData?.password || formData.password.length < 8) {
				return fail(422, {
					success: false,
					message: 'Password must be at least 8 characters long'
				});
			}

			if (formData?.confirmPassword !== formData?.password) {
				return fail(422, {
					success: false,
					message: 'Password confirmation does not match password'
				});
			}

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/reset-password`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}

			const body = await response.json();
			const role = body.role === ADMIN ? ADMIN : 'presenter';
			redirect(303, `/${role}/reset-password/success`);
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
