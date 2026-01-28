export const GROUP_LEAD = 'groupLead';
export const FACILITATOR = 'trainedFacilitator';
export const ADMIN = 'admin';

export const ROLE_PRETTY_NAMES = {
	[GROUP_LEAD]: 'Group Lead',
	[FACILITATOR]: 'Trained Facilitator',
	[ADMIN]: 'Admin'
};

export const AUTH_EMAIL_TEMPLATE = '8d-evolution-auth-flow';
export const RESULTS_EMAIL_TEMPLATE = '8d-evolution-results';

export const START = 'Map Collective Start';
export const END = 'Map Collective End';
export const COMPLETE = 'Complete';

export const POLLING_INTERVAL_MS = 3000;
export const POLLING_COUNT_MAX_MS = 1000 * 60 * 15; // pause after 15 minutes of polling
export const POLLING_COUNT_MAX = POLLING_COUNT_MAX_MS / POLLING_INTERVAL_MS;

export const GROUP_START_YEAR = 2026;

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
