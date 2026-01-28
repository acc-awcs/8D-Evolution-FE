import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function GET({ cookies, params }) {
	const sessionToken = cookies.get('sessionToken');
	const { groupId } = params;

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/group?groupId=${groupId}`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in presentation server load', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return new Response(JSON.stringify({ data }), { status: 200 });
}
