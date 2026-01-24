import { COMPLETE, END, START } from '$lib/constants';

export function getStatus(group: any) {
	if (group.endPollCode && group.endPollInitiated) {
		return COMPLETE;
	}
	if (group.startPollCode && group.startPollInitiated) {
		return END;
	}
	return START;
}

export function getStatusColor(status: any) {
	if (status === COMPLETE) {
		return 'neon';
	}
	if (status === END) {
		return 'soil';
	}
	return 'periwinkle';
}
