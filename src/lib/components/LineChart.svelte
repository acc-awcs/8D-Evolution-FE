<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let {
		data,
		keys = [
			{
				label: 'Participants',
				id: 'participants'
			},
			{
				label: 'Groups',
				id: 'groups'
			}
		]
	} = $props();

	onMount(async (promise) => {
		new Chart(document.getElementById('chart'), {
			type: 'line',
			data: {
				labels: data.map((row) => row.month),
				datasets: [
					{
						label: keys[0].label,
						data: data.map((row) => row[keys[0].id]),
						backgroundColor: '#859bea',
						borderColor: '#a2b6fc'
					},
					{
						label: keys[1].label,
						data: data.map((row) => row[keys[1].id]),
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
