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

<div class="top-page">
	<h1 class="title large">Our Collective Shift</h1>
	<div class="chart-wrapper">
		{#if startAnswers && endAnswers}
			<div class="chart chart-fade-in" aria-hidden="true" bind:clientWidth={startChartWidth}>
				<h2 class="uppercase-title">Starting Point</h2>
				<SpiderChart
					answers={startAnswers}
					chartWidth={startChartWidth}
					onHover={() => null}
					onLeave={() => null}
					highlight={12}
					isCollectivePoll={true}
					isStart={true}
				/>
			</div>
			<div class="chart chart-fade-in delayed" aria-hidden="true" bind:clientWidth={endChartWidth}>
				<h2 class="uppercase-title">Ending Point</h2>

				<SpiderChart
					answers={endAnswers}
					chartWidth={endChartWidth}
					onHover={() => null}
					onLeave={() => null}
					highlight={12}
					isCollectivePoll={true}
				/>
			</div>
		{/if}
	</div>
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
		margin-bottom: 30px;
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

	.top-page {
		height: 100vh;
		min-height: 100vh;
		height: 100dvh;
		min-height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
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
		margin-bottom: 26px;
		margin-top: 26px;
	}

	.dynamics-wrapper {
		margin: 30px 0px;
		display: flex;
		justify-content: center;
		padding-bottom: 20vh;
	}
</style>
