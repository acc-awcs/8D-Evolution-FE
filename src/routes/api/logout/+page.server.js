import { isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ cookies }) => {
		try {
			cookies.delete('sessionToken', { path: '/' });

			redirect(303, '/groups');
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred:', error);
			return {
				success: false
			};
		}
	},
	adminLogout: async ({ cookies }) => {
		try {
			cookies.delete('sessionToken', { path: '/' });

			redirect(303, '/admin');
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
