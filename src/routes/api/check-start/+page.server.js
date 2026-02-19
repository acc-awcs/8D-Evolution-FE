import { PUBLIC_SERVER_URL } from '$env/static/public';

export const actions = {
	checkStartCode: async ({ cookies, request }) => {
		const formData = await request.formData();
		// @ts-ignore
		// formData.forEach((value, key) => (formData[key] = value));
		console.log('FORM DATA?', formData);
		try {
			const response = await fetch(
				`${PUBLIC_SERVER_URL}/api/results?resultCode=${startCode}&startOnly=true`,
				{
					method: 'GET'
				}
			);

			if (!response.ok) {
				// bad request
				if (response.status === 404) {
					return { success: false, notFound: true };
				} else {
					throw new Error('Failed to fetch result code');
				}
			} else {
				// there's already an ending point result for this start code
				const body = await response.json();
				return { success: true, redirectCode: body?.redirectCode };
			}
		} catch (err) {
			return { success: false, message: err.message };
		}
	}
};
