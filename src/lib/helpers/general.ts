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

export const dbKeysToToolKeys: any = {
	d1: 'A',
	d2: 'B',
	d3: 'C',
	d4: 'D',
	d5: 'E',
	d6: 'F',
	d7: 'G',
	d8: 'H'
};

export const transformResults = (data: any) => {
	if (!data) {
		return null;
	}

	const answers = Object.keys(data)
		.filter((k) => dbKeysToToolKeys[k])
		.map((k) => ({
			key: dbKeysToToolKeys[k],
			value: data[k]
		}));

	const object = {
		A: data.d1,
		B: data.d2,
		C: data.d3,
		D: data.d4,
		E: data.d5,
		F: data.d6,
		G: data.d7,
		H: data.d8
	};

	return {
		answers,
		object,
		isStart: data?.isStart
	};
};

export const getIntFromID = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
};

const convertJsonToCsv = (rows: any) => {
	const replacer = (key: string, value: any) => (value === null ? '' : value);
	const header = Object.keys(rows[0]);

	let csv = rows.map((row: any) =>
		header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
	);
	csv.unshift(header.join(','));
	csv = csv.join('\n');

	return csv;
};

export const exportAndDownloadCsv = (rows: any, fileName: string) => {
	const csvData = convertJsonToCsv(rows);
	const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);

	const downloadLink = document.createElement('a');
	downloadLink.href = url;
	downloadLink.download = fileName;

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);

	URL.revokeObjectURL(url);
};
