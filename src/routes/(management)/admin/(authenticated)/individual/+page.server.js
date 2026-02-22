import { PUBLIC_SERVER_URL } from '$env/static/public';
import { FACILITATOR } from '$lib/constants.js';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const sessionToken = cookies.get('sessionToken');
	const page = url.searchParams.get('p') || 0;
	const response = await fetch(`${PUBLIC_SERVER_URL}/api/individual-results?page=${page}`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in auth server load admin', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return {
		data
	};

	// return {
	// 	...data,
	// 	chartData: fetch(`${PUBLIC_SERVER_URL}/api/chart?role=${FACILITATOR}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${sessionToken}`
	// 		},
	// 		method: 'GET'
	// 	}).then((res) => res.json()),
	// 	aggregateData: fetch(`${PUBLIC_SERVER_URL}/api/group-results-aggregate?role=${FACILITATOR}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${sessionToken}`
	// 		},
	// 		method: 'GET'
	// 	}).then((res) => res.json()),
	// 	query: {
	// 		page: data.validPage
	// 	}
	// };
}
