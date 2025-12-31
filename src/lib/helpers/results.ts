export const prettyCode = (code: number | string) => {
	const strCode = `${code}`;
	if (!(strCode.length === 6)) {
		return 'Invalid Code';
	}
	return `${strCode.slice(0, 3)} ${strCode.slice(3, 6)}`;
};

const getAverageValFromArray = (arr: [number]) => {
	const sum = arr.reduce((total, num) => num + total, 0);
	return sum / arr.length;
};

export const formatAnswers = (resultsArray: any) => {
	return resultsArray?.reduce(
		(ans: any, res: any, index: number) => {
			ans[0].push(res.d1);
			ans[1].push(res.d2);
			ans[2].push(res.d3);
			ans[3].push(res.d4);
			ans[4].push(res.d5);
			ans[5].push(res.d6);
			ans[6].push(res.d7);
			ans[7].push(res.d8);
			if (index === resultsArray.length - 1) {
				const meanAns = ans.map(getAverageValFromArray);
				return {
					A: meanAns[0],
					B: meanAns[1],
					C: meanAns[2],
					D: meanAns[3],
					E: meanAns[4],
					F: meanAns[5],
					G: meanAns[6],
					H: meanAns[7]
				};
			}
			return ans;
		},
		[[], [], [], [], [], [], [], []]
	);
};
