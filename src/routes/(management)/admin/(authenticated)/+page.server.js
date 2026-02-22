import { PUBLIC_SERVER_URL } from '$env/static/public';
import { FACILITATOR } from '$lib/constants.js';
import { statusIsGood } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const sessionToken = cookies.get('sessionToken');

	const page = url.searchParams.get('p') || 0;
	const timeRange = url.searchParams.get('tr') || 'all';
	const startDate = url.searchParams.get('s') || null;
	const endDate = url.searchParams.get('e') || null;

	const response = await fetch(
		`${PUBLIC_SERVER_URL}/api/group-results-page?role=${FACILITATOR}&page=${page}&tr=${timeRange}&s=${startDate}&e=${endDate}`,
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			},
			method: 'GET'
		}
	);

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
		...data,
		chartData: fetch(
			`${PUBLIC_SERVER_URL}/api/chart?role=${FACILITATOR}&tr=${timeRange}&s=${startDate}&e=${endDate}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`
				},
				method: 'GET'
			}
		).then((res) => res.json()),
		aggregateData: fetch(`${PUBLIC_SERVER_URL}/api/group-results-aggregate?role=${FACILITATOR}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			},
			method: 'GET'
		}).then((res) => res.json()),
		query: {
			page: data.validPage,
			timeRange,
			startDate,
			endDate
		}
	};
}

// export const actions = {
//   default: async ({ cookies, request }) => {
//     try {
//       const sessionToken = cookies.get('sessionToken');
//       const formData = await request.formData();
//       // @ts-ignore
//       formData.forEach((value, key) => (formData[key] = value));

//       const response = await fetch(`${PUBLIC_SERVER_URL}/api/new-group`, {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//           'content-type': 'application/json',
//           Authorization: `Bearer ${sessionToken}`
//         }
//       });

//       if (!statusIsGood(response.status)) {
//         const body = await response.json();
//         console.log('Error in auth server default', body);
//         return fail(422, {
//           success: false,
//           message: body?.msg
//         });
//       }

//       const newGroup = await response.json();

//       redirect(303, `/groups/g/${newGroup._id}`);
//     } catch (error) {
//       if (isRedirect(error)) {
//         throw error;
//       }
//       console.error('An error occurred in auth server default:', error);
//       return {
//         success: false
//       };
//     }
//   }
// };
