import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const page = url.searchParams.get('p') || 0;
	const timeRange = url.searchParams.get('tr') || 'all';
	const startDate = url.searchParams.get('s') || null;
	const endDate = url.searchParams.get('e') || null;

	const response = await fetch(
		`${PUBLIC_SERVER_URL}/api/surveys?tr=${timeRange}&s=${startDate}&e=${endDate}&page=${page}`,
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			},
			method: 'GET'
		}
	);

	if (!statusIsGood(response.status)) {
		if (response.status === 401) {
			redirect(303, '/admin/login');
		} else {
			const errorBody = await response.text();
			console.log('Error in auth server load admin', response.status, errorBody);
			error(500);
		}
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return {
		...data,
		query: {
			page: data.validPage,
			timeRange,
			startDate,
			endDate
		}
	};
}
