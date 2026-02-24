import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood, transformResults } from '$lib/helpers/general';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }: { params: { code: string }; fetch: any }) {
	const { code } = params;
	const response = await fetch(`${PUBLIC_SERVER_URL}/api/results?resultCode=${code}`, {
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
		resultCode: code
	};
}

export async function _sendEmail(
	email: string,
	resultCode: string,
	addToNewsletter: boolean
): Promise<{ success: boolean; message?: string; invalidFormat?: boolean }> {
	try {
		const response = await fetch('/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, resultCode, addToNewsletter })
		});

		if (!response.ok) {
			// bad request
			if (response.status === 400) {
				return { success: false, invalidFormat: true };
			} else {
				throw new Error('Failed to send email');
			}
		} else {
			return { success: true };
		}
	} catch (err: Error) {
		return { success: false, message: err.message };
	}
}

export async function _sendShiftsEmail(
	email: string,
	resultCode: string,
	addToNewsletter: boolean
): Promise<{ success: boolean; message?: string; invalidFormat?: boolean }> {
	try {
		const response = await fetch('/api/shifts-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, resultCode, addToNewsletter })
		});

		if (!response.ok) {
			// bad request
			if (response.status === 400) {
				return { success: false, invalidFormat: true };
			} else {
				throw new Error('Failed to send email');
			}
		} else {
			return { success: true };
		}
	} catch (err: Error) {
		return { success: false, message: err.message };
	}
}

export const csr = true;
export const prerender = false;
