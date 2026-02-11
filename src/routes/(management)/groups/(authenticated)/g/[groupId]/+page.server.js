import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { isRedirect } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ cookies, fetch, params }) {
	const sessionToken = cookies.get('sessionToken');
	const { groupId } = params;

	const response = await fetch(`${PUBLIC_SERVER_URL}/api/group?groupId=${groupId}`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		},
		method: 'GET'
	});

	if (!statusIsGood(response.status)) {
		const errorBody = await response.text();
		console.log('Error in group page server', response.status, errorBody);
		error(500);
	}

	const data = await response.json();

	if (!data) {
		error(404, 'Not Found');
	}

	return data;
}

export const actions = {
	delete: async ({ cookies, request }) => {
		try {
			const sessionToken = cookies.get('sessionToken');

			// const data = await request.json();
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/delete-group`, {
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

			const deletedGroup = await response.json();

			redirect(303, `/groups`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in group delete:', error);
			return {
				success: false
			};
		}
	},

	// Edit group
	edit: async ({ cookies, request }) => {
		try {
			const sessionToken = cookies.get('sessionToken');
			const formData = await request.formData();
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/edit-group`, {
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
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in group edit:', error);
			return {
				success: false
			};
		}
	},

	beginPoll: async ({ cookies, request, params }) => {
		try {
			const sessionToken = cookies.get('sessionToken');
			const formData = await request.formData();
			formData.append('groupId', params.groupId);
			const isStart = formData.get('isStart') === 'true';
			// @ts-ignore
			formData.forEach((value, key) => (formData[key] = value));

			const response = await fetch(`${PUBLIC_SERVER_URL}/api/poll/begin`, {
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

			redirect(303, `/groups/g/${params.groupId}/${isStart ? 'start' : 'end'}`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}
			console.error('An error occurred in beginPoll:', error);
			return {
				success: false
			};
		}
	}
};
