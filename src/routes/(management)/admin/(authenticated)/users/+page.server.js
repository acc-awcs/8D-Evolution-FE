import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const sessionToken = cookies.get('sessionToken');
	const page = url.searchParams.get('p') || 0;
	const showGroupLeads = url.searchParams.get('showGroupLeads') || 'false';

	const response = await fetch(
		`${PUBLIC_SERVER_URL}/api/users?page=${page}&showGroupLeads=${showGroupLeads}`,
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			},
			method: 'GET'
		}
	);

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in users server load admin', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return {
		...data,
		query: {
			page: data.validPage,
			showGroupLeads
		}
	};
}
