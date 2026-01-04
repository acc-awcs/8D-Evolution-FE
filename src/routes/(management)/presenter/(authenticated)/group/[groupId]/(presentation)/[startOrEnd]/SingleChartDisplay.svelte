<script>
	import DynamicList from '$lib/components/DynamicList.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { formatAnswers } from '$lib/helpers/results';

	let chartWidth = $state(450);

	let { results } = $props();

	const answers = $derived(results?.length > 0 ? formatAnswers(results) : null);
</script>

<div class="chart-wrapper">
	<div class="chart" aria-hidden="true" bind:clientWidth={chartWidth}>
		{#if answers}
			<div class="chart-fade-in">
				<SpiderChart
					{answers}
					{chartWidth}
					onHover={() => null}
					onLeave={() => null}
					highlight={12}
					isCollectivePoll={true}
				/>
			</div>
		{:else}
			<p>Waiting for results to come in ...</p>
		{/if}
	</div>
	{#if answers}
		<DynamicList />
	{/if}
</div>

<style>
	.chart {
		max-width: 100%;
		width: 500px;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 40px;
	}

	.chart p {
		margin-top: 0px;
		margin-bottom: 30px;
	}

	.chart-wrapper {
		display: flex;
		justify-content: center;
		max-width: 100%;
		gap: 60px;
		align-items: center;
	}
</style>
