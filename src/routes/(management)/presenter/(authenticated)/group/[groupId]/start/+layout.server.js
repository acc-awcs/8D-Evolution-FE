import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error, redirect } from '@sveltejs/kit';

// Need to have this again since we reset the layout
export async function load({ cookies, fetch, params }) {
	const sessionToken = cookies.get('sessionToken');

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/account`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		if (response.status === 401) {
			redirect(303, '/presenter/login');
		} else {
			error(500);
		}
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return {
		...data,
		...params
	};
}
