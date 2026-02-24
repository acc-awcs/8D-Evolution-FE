import { PUBLIC_SERVER_URL } from '$env/static/public';
import { FACILITATOR } from '$lib/constants.js';
import { statusIsGood } from '$lib/helpers/general';
import { fail } from '@sveltejs/kit';
import { isRedirect } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const page = url.searchParams.get('p') || 0;
	const timeRange = url.searchParams.get('tr') || 'all';
	const startDate = url.searchParams.get('s') || null;
	const endDate = url.searchParams.get('e') || null;
	const showTestData = url.searchParams.get('test') || null;

	const response = await fetch(
		`${PUBLIC_SERVER_URL}/api/group-results-page?role=${FACILITATOR}&tr=${timeRange}&s=${startDate}&e=${endDate}&page=${page}&showTestData=${showTestData}`,
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
			endDate,
			showTestData
		}
	};
}

export const actions = {
	export: async ({ cookies, request }) => {
		try {
			const sessionToken = cookies.get('sessionToken');

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/export-groups?role=${FACILITATOR}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${sessionToken}`
				}
			});

			if (!statusIsGood(response.status)) {
				const body = await response.json();
				return fail(422, {
					success: false,
					message: body?.msg
				});
			}
			const body = await response.json();

			return {
				success: true,
				rows: body?.rows
			};
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in group export:', error);
			return {
				success: false
			};
		}
	}
};
