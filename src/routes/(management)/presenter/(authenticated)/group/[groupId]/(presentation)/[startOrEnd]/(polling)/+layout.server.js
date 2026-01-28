// Pass params to children
export async function load({ params }) {
	const { groupId, startOrEnd } = params;
	const isStart = startOrEnd === 'start';

	return {
		groupId,
		isStart,
		startOrEnd
	};
}
