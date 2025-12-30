import { PUBLIC_SERVER_URL } from '$env/static/public';
import dynamics from '$lib/dynamics';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const response = await fetch(`${PUBLIC_SERVER_URL}/api/poll?pollCode=${params.pollCode}`, {
		method: 'GET'
	});
	return {
		dynamics
	};
}

// we need JS for scroll behavior and form submission
export const csr = true;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
