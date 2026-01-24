import { PUBLIC_SERVER_URL } from '$env/static/public';
import { statusIsGood } from '$lib/helpers/general';
import { isRedirect, redirect } from '@sveltejs/kit';

// Check to make sure this poll exists, and return it.
// If poll exists AND the quiz has started, go straight to the quiz page.
// If poll doesn't exist, go to generic poll code entry page.
export async function load({ cookies, fetch, params, url }) {
	try {
		// Check to see if user already has a valid poll token, and redirect to the ready page if so
		const pollToken = cookies.get('pollToken');
		const response = await fetch(
			`${PUBLIC_SERVER_URL}/api/poll/ready?pollToken=${pollToken}&pollCode=${params.pollCode}`,
			{
				method: 'GET'
			}
		);

		if (statusIsGood(response.status)) {
			const body = await response.json();
			if (body.pollHasBeenInitiated && !body.alreadySubmitted) {
				// Apply pollToken if one doesn't exist yet for this user and this quiz.
				if (body.newPollToken) {
					cookies.set('pollToken', body.newPollToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
						sameSite: 'strict',
						path: '/',
						maxAge: 60 * 60 * 24 // 1 day
					});
				}
				redirect(303, `/poll/${params.pollCode}/quiz`);
			}
			if (body.tokenMatchesPoll) {
				if (body.alreadySubmitted) {
					redirect(303, `/poll/${params.pollCode}/post-quiz`);
				}
				if (!url.pathname.includes('ready')) {
					redirect(303, `/poll/${params.pollCode}/ready`);
				}
			}

			return {
				...params
			};
		} else {
			redirect(303, '/poll');
		}
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
// export async function load({ fetch, params }) {
// 	try {
// 		const response = await fetch(`${PUBLIC_SERVER_URL}/api/poll?pollCode=${params.pollCode}`, {
// 			method: 'GET'
// 		});

// 		if (statusIsGood(response.status)) {
// 			const body = await response.json();
// 			if (body.pollHasBeenInitiated) {
// 				redirect(303, `/poll/${params.pollCode}/quiz`);
// 			}
// 			return {
// 				...params,
// 				poll: body
// 			};
// 		}

// 		redirect(303, '/poll');
// 	} catch (error) {
// 		if (isRedirect(error)) {
// 			throw error;
// 		}
// 		console.error('An error occurred:', error);
// 		return {
// 			success: false
// 		};
// 	}
// }
