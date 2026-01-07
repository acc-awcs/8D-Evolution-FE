import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/users`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in users server load admin', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return data;
}
