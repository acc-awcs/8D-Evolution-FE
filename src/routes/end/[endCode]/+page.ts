import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: { params: { endCode: string } }) {
	const { endCode } = params;
	// const response = await fetch(`${PUBLIC_SERVER_URL}/api/results?resultCode=${endCode}`, {
	// 	method: 'GET'
	// });

	// if (!statusIsGood(response.status)) {
	// 	return {
	// 		endCode
	// 	};
	// }

	// const data = await response.json();
	// if (data?.currentResults?.startCode) {
	// 	redirect(303, `/results/${endCode}`);
	// }

	return {
		endCode
	};
}

export async function _checkStartCode(
	startCode: string,
	endCode: string
): Promise<{ success: boolean; message?: string; notFound?: boolean; redirectCode?: string }> {
	try {
		const response = await fetch(
			`${PUBLIC_SERVER_URL}/api/results?resultCode=${startCode.toUpperCase()}&startOnly=true&endCode=${endCode.toUpperCase()}`,
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
	} catch (err: Error) {
		return { success: false, message: err.message };
	}
}
