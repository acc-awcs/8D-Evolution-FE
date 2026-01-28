import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function GET({ cookies, params }) {
	const sessionToken = cookies.get('sessionToken');
	// const { groupId, startOrEnd } = params;
	let { groupId, startOrEnd } = params;
	const isStart = startOrEnd === 'start';

	const response = await fetch(
		`${PUBLIC_SERVER_URL}/api/poll/results?groupId=${groupId}&isStart=${isStart}`,
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			},
			method: 'GET'
		}
	);

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in presentation polling layout load', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return new Response(JSON.stringify({ data }), { status: 200 });

	// return {
	// 	...data,
	// 	groupId,
	// 	isStart,
	// 	startOrEnd
	// };
}
