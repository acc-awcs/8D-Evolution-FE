import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood, transformResults } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const { resultCode } = params;
	const response = await fetch(`${PUBLIC_SERVER_URL}/api/results?resultCode=${resultCode}`, {
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	const currentResults = data.currentResults;
	const startingPointResults = data.startingPointResults; // this should be null if it's a starting point quiz

	return {
		current: transformResults(currentResults),
		start: transformResults(startingPointResults),
		resultCode
	};
}
