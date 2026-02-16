export async function POST({ request, cookies }) {
	const { data } = await request.json();
	cookies.set('pollToken', data.newPollToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 // 1 day
	});
	return new Response(JSON.stringify({ message: 'Successfully set cookie', success: true }), {
		status: 200
	});
}
