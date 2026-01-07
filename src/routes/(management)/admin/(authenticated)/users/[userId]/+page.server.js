import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { redirect } from '@sveltejs/kit';
import { isRedirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ cookies, params, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/user?userId=${params.userId}`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in user server load admin', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return data;
}

export const actions = {
	edit: async ({ cookies, request, params }) => {
		try {
			const sessionToken = cookies.get('sessionToken');
			const formData = await request.formData();
			formData.append('userId', params.userId);

			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/update-user`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${sessionToken}`
				}
			});

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in user edit:', error);
			return {
				success: false
			};
		}
	},
	delete: async ({ cookies, request }) => {
		try {
			const sessionToken = cookies.get('sessionToken');

			// const data = await request.json();
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/delete-user`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${sessionToken}`
				}
			});

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}

			redirect(303, `/admin/users`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in user delete:', error);
			return {
				success: false
			};
		}
	}
};
