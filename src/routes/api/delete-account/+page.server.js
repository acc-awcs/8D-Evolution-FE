import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { fail } from '@sveltejs/kit';
import { isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ cookies }) => {
		try {
			const sessionToken = cookies.get('sessionToken');
			const response = await fetch(`${PUBLIC_SERVER_URL}/api/delete-account`, {
				method: 'POST',
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

			redirect(303, `/groups/login`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in account delete:', error);
			return {
				success: false
			};
		}
	}
};
