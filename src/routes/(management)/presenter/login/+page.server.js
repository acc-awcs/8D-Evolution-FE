import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			// const data = await request.json();
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			if (!formData?.email || formData.email.length < 1) {
				return fail(422, {
					success: false,
					message: 'Email is required'
				});
			}

			if (!formData?.password || formData.password.length < 8) {
				return fail(422, {
					success: false,
					message: 'Password must be at least 8 characters long'
				});
			}

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/login`, {
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
					message: body?.msg,
					admin: body?.admin
				});
			}

			const body = await response.json();

			cookies.set('sessionToken', body.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 // 1 day
			});

			redirect(303, '/presenter');
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
