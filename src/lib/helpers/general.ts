import { GROUP_START_YEAR, MONTHS } from '$lib/constants';

export const statusIsGood = (status: number) => status >= 200 && status < 300;

export const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const shortenUrl = (url: string) => {
	return url.replace('https://', '').replace('http://', '');
};

export const getYearDiff = () => {
	const currentUTCYear = new Date().getUTCFullYear();
	const yearDiff = currentUTCYear + 3 - GROUP_START_YEAR;
	return yearDiff;
};

export const getCurrentMonth = () => {
	const currentMonth = new Date().getMonth();
	console.log('U', currentMonth);
	return MONTHS[currentMonth];
};
