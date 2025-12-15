import { isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		try {
			cookies.delete('sessionToken', { path: '/' });

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
