import { PUBLIC_SERVER_URL } from '$env/static/public';
import { FACILITATOR } from '$lib/constants.js';
import { statusIsGood } from '$lib/helpers/general';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

const isEmpty = (val) => !val || val.length < 1;

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

			if (isEmpty(formData.accountType)) {
				return fail(422, {
					success: false,
					message: 'Trained Facilitator or Group Lead specification is required'
				});
			}

			if (formData?.accountType === FACILITATOR && isEmpty(formData.firstName)) {
				return fail(422, {
					success: false,
					message: 'First name is required'
				});
			}

			if (formData?.accountType === FACILITATOR && isEmpty(formData.lastName)) {
				return fail(422, {
					success: false,
					message: 'Last name is required'
				});
			}

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/create-account`, {
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

			cookies.set('sessionToken', body.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 // 1 day
			});

			redirect(303, '/groups');

			// redirect(303, '/verification-sent');
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
