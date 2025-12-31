import dynamics from '$lib/dynamics';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		...params,
		dynamics
	};
}
