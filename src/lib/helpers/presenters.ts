import { COMPLETE, END, START } from '$lib/constants';

export function getStatus(group: any) {
	if (group.collectiveEndData?.length > 0) {
		return COMPLETE;
	}
	if (group.collectiveStartData?.length > 0) {
		return END;
	}
	return START;
}

export function getStatusColor(status: any) {
	if (status === COMPLETE) {
		return 'olive';
	}
	if (status === END) {
		return 'periwinkle';
	}
	return 'canyon';
}
