<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { data } = $props();

	// const data = [
	// 	{ year: 2010, month: 'January', newGroups: 10, participants: 100 },
	// 	{ year: 2011, month: 'February', newGroups: 20, participants: 100 },
	// 	{ year: 2012, month: 'March', newGroups: 15, participants: 70 },
	// 	{ year: 2013, month: 'April', newGroups: 25, participants: 100 },
	// 	{ year: 2014, month: 'Map', newGroups: 22, participants: 100 },
	// 	{ year: 2015, month: 'June', newGroups: 30, participants: 80 },
	// 	{ year: 2016, month: 'July', newGroups: 28, participants: 120 },
	// 	{ year: 2016, month: 'August', newGroups: 28, participants: 100 },
	// 	{ year: 2016, month: 'September', newGroups: 28, participants: 100 },
	// 	{ year: 2016, month: 'October', newGroups: 12, participants: 100 },
	// 	{ year: 2016, month: 'November', newGroups: 12, participants: 100 }
	// ];

	onMount(async (promise) => {
		new Chart(document.getElementById('chart'), {
			type: 'line',
			data: {
				labels: data.map((row) => row.month),
				datasets: [
					{
						label: 'Participants',
						data: data.map((row) => row.participants),
						backgroundColor: '#859bea',
						borderColor: '#a2b6fc'
					},
					{
						label: 'Groups',
						data: data.map((row) => row.groups),
						backgroundColor: '#bc703e',
						borderColor: '#d18856'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'index',
					intersect: false
				},
				plugins: {
					legend: {
						position: 'top'
					}
					// title: {
					// 	display: true,
					// 	text: 'Chart.js Line Chart'
					// }
				}
			}
		});
	});
</script>

<div class="wrapper">
	<canvas id="chart"></canvas>
</div>

<style>
	.wrapper {
		width: 100%;
		padding: 0px 30px;
		height: 400px;
		box-sizing: border-box;
	}
</style>
