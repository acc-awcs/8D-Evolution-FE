<script>
	import DynamicsSimpleComparison from '$lib/components/DynamicsSimpleComparison.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { formatAnswers } from '$lib/helpers/results';

	let startChartWidth = $state(450);
	let endChartWidth = $state(450);
	let { data } = $props();

	const startAnswers = $derived(
		data.startMatchingResults?.length > 0 ? formatAnswers(data.startMatchingResults) : null
	);

	const endAnswers = $derived(
		data.matchingResults?.length > 0 ? formatAnswers(data.matchingResults) : null
	);
</script>

<h1 class="title">Our Collective Shift</h1>

<div class="chart-wrapper">
	{#if startAnswers && endAnswers}
		<div class="chart chart-fade-in" aria-hidden="true" bind:clientWidth={startChartWidth}>
			<h2>Start</h2>
			<SpiderChart
				answers={startAnswers}
				chartWidth={startChartWidth}
				onHover={() => null}
				onLeave={() => null}
				highlight={12}
				isCollectivePoll={true}
				isStart={true}
			/>
			<p>
				Averaged results from {data.startMatchingResults?.length} response{data.startMatchingResults
					?.length === 1
					? ''
					: 's'} on {new Date(data.group.startPollDate).toLocaleString('en-US', {
					// weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		</div>
		<div class="chart chart-fade-in delayed" aria-hidden="true" bind:clientWidth={endChartWidth}>
			<h2>End</h2>

			<SpiderChart
				answers={endAnswers}
				chartWidth={endChartWidth}
				onHover={() => null}
				onLeave={() => null}
				highlight={12}
				isCollectivePoll={true}
			/>
			<p>
				Averaged results from {data.matchingResults?.length} response{data.matchingResults
					?.length === 1
					? ''
					: 's'} on {new Date(data.group.endPollDate).toLocaleString('en-US', {
					// weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		</div>
	{/if}
</div>

<div class="dynamics-wrapper chart-fade-in delayed-extra">
	<DynamicsSimpleComparison
		startAnswers={Object.values(startAnswers)}
		endAnswers={Object.values(endAnswers)}
	/>
</div>

<style>
	.title {
		text-align: center;
		margin-top: 0px;
	}

	.chart {
		max-width: 100%;
		width: 450px;
		/* height: 550px; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.chart p {
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 15px;
	}

	.chart-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		gap: 80px;
	}

	.delayed {
		animation-delay: 1.25s;
	}

	.delayed-extra {
		animation-delay: 2.5s;
	}

	h2 {
		font-family: 'Instrument Serif', serif;
	}

	.dynamics-wrapper {
		margin: 30px 0px;
		display: flex;
		justify-content: center;
	}
</style>
