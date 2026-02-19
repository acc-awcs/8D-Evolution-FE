import dynamics from '$lib/dynamics';

/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		dynamics
	};
}

// we need JS for scroll behavior and form submission
export const csr = true;

export const prerender = false;
