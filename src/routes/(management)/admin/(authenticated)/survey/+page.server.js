import { PUBLIC_SERVER_URL } from '$env/static/public';
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

export const actions = {
	delete: async ({ cookies, request }) => {
		try {
			const sessionToken = cookies.get('sessionToken');
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/delete-survey`, {
				method: 'POST',
				body: JSON.stringify(formData),
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

			redirect(303, `/admin/survey`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in survey response delete:', error);
			return {
				success: false
			};
		}
	},

	export: async ({ cookies, request }) => {
		try {
			const sessionToken = cookies.get('sessionToken');

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/export-surveys`, {
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
			console.error('An error occurred in survey export:', error);
			return {
				success: false
			};
		}
	}
};
