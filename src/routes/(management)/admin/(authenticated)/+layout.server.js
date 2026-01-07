import { PUBLIC_SERVER_URL } from '$env/static/public';
import { ADMIN } from '$lib/constants.js';
import { statusIsGood } from '$lib/helpers/general';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/account`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		if (response.status === 401) {
			redirect(303, '/admin/login');
		} else {
			const errorBody = await response.text();
			console.log('Error in auth layout', response.status, errorBody);
			error(500);
		}
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	console.log('DATA?', data);

	if (data.role !== ADMIN) {
		redirect(303, '/presenter');
	}

	return data;
}
