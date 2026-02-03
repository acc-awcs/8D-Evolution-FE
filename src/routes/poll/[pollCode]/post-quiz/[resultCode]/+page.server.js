import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood, transformResults } from '$lib/helpers/general';
import { error, fail } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const { resultCode, pollCode } = params;
	const response = await fetch(
		`${PUBLIC_SERVER_URL}/api/results?resultCode=${resultCode}&pollCode=${pollCode}`,
		{
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

	const currentResults = data.currentResults;
	const startingPointResults = data.startingPointResults; // this should be null if it's a starting point quiz

	return {
		showEndingSurvey: data?.showEndingSurvey,
		current: transformResults(currentResults),
		start: transformResults(startingPointResults),
		resultCode
	};
}

export const actions = {
	survey: async ({ request, params }) => {
		try {
			const formData = await request.formData();
			formData.append('pollCode', params.pollCode);
			formData.append('resultCode', params.resultCode);

			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/survey`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}
		} catch (error) {
			// if (isRedirect(error)) {
			// 	throw error;
			// }
			console.error('An error occurred in survey submission:', error);
			return {
				success: false
			};
		}
	}
};
