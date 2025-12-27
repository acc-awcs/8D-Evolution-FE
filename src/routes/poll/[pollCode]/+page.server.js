import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch, params }) {
	try {
		// const data = await request.json();
		const pollToken = cookies.get('pollToken');

		const response = await fetch(`${PUBLIC_SERVER_URL}/api/poll/ready?pollToken=${pollToken}`, {
			method: 'GET'
		});

		if (statusIsGood(response.status)) {
			const body = await response.json();
			redirect(303, `/poll/${body.pollCode}/ready`);
		}
	} catch (error) {
		if (isRedirect(error)) {
			throw error;
		}
		console.error('An error occurred:', error);
		return {
			success: false
		};
	}

	return {
		...params
	};
}

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			// const data = await request.json();
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/poll/ready`, {
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

			cookies.set('pollToken', body.pollToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 // 1 day
			});

			redirect(303, `/poll/${body.pollCode}/ready`);
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
