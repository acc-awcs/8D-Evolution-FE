import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { isRedirect, redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

// This function will be run on an interval to poll for registrant updates
export async function load({ cookies, fetch, params }) {
	const sessionToken = cookies.get('sessionToken');
	const { groupId, startOrEnd } = params;
	const isStart = startOrEnd === 'start';

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/group?groupId=${groupId}`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in presentation server load', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return {
		...data,
		isStart,
		pollCode: isStart ? data.group.startPollCode : data.group.endPollCode
	};
}

export const actions = {
	updateGroup: async ({ cookies, request, params }) => {
		try {
			const sessionToken = cookies.get('sessionToken');
			const formData = await request.formData();
			const startOrEnd = params.startOrEnd;
			formData.append('groupId', params.groupId);
			formData.append('key', `${startOrEnd}PollInitiated`);
			formData.append('value', 'true');

			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/update-group`, {
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

			redirect(303, `/groups/g/${params.groupId}/${startOrEnd}/responses`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred:', error);
			return {
				success: false
			};
		}
	}
};
