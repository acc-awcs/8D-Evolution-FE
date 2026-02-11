import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

// This function will be run on an interval to poll for registrant updates
export async function load({ cookies, fetch, params }) {
	const sessionToken = cookies.get('sessionToken');
	const { groupId, startOrEnd } = params;
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
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return {
		...data,
		isStart,
		startOrEnd
	};
}
