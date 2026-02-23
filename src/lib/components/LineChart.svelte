<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { data } = $props();

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
		margin-top: 30px;
		margin-bottom: 20px;
	}
</style>
