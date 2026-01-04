import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';

// TODO: Make this not an api call
export async function POST({ request, cookies }) {
	try {
		const pollToken = cookies.get('pollToken');
		const data = await request.json();
		const response = await fetch(`${PUBLIC_SERVER_URL}/api/results`, {
			method: 'POST',
			body: JSON.stringify({
				...data,
				pollToken
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (!statusIsGood(response.status)) {
			throw new Error(`Bad request, got status ${response.status}`);
		}

		const body = await response.json();

		return new Response(JSON.stringify(body), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: `Failed to send email. ${err}` }), { status: 500 });
	}
}
