import { PUBLIC_SERVER_URL } from '$env/static/public';

export const _getPoll = async (pollCode: string) => {
	try {
		const response = await fetch(`${PUBLIC_SERVER_URL}/api/poll?pollCode=${pollCode}`, {
			method: 'GET'
		});

		if (!response.ok) {
			// bad request
			if (response.status === 404) {
				return { success: false, notFound: true };
			} else {
				throw new Error('Failed to fetch poll from code');
			}
		} else {
			return { success: true };
		}
	} catch (err: any) {
		return { success: false, message: err.message };
	}
};
