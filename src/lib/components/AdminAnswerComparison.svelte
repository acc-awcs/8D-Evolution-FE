<script>
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import Table from '$lib/components/Table.svelte';

	let startChartWidth = $state(450);
	let endChartWidth = $state(450);
	let {
		startAnswers,
		endAnswers,
		averagedStartResults,
		averagedEndResults,
		startPollDate = null,
		endPollDate = null,
		startResults = null,
		endResults = null
	} = $props();

	const isValid = (v) => v && !Array.isArray(v);
</script>

{#if startAnswers || endAnswers}
	<div class="chart-wrapper">
		{#if startAnswers}
			<div class="chart" aria-hidden="true" bind:clientWidth={startChartWidth}>
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
				{#if startPollDate}
					<p>
						Averaged results from {startResults?.length} response{startResults?.length === 1
							? ''
							: 's'} on {new Date(startPollDate).toLocaleString('en-US', {
							// weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				{/if}
			</div>
		{/if}
		{#if endAnswers}
			<div class="chart" aria-hidden="true" bind:clientWidth={endChartWidth}>
				<h2>End</h2>

				<SpiderChart
					answers={endAnswers}
					chartWidth={endChartWidth}
					onHover={() => null}
					onLeave={() => null}
					highlight={12}
					isCollectivePoll={true}
				/>
				{#if endPollDate}
					<p>
						Averaged results from {endResults?.length} response{endResults?.length === 1 ? '' : 's'} on
						{new Date(endPollDate).toLocaleString('en-US', {
							// weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<p>No start or end data is available yet.</p>
{/if}

<br /><br />

{#if isValid(averagedStartResults?.[0]) && isValid(averagedEndResults?.[0])}
	{@const startArray = averagedStartResults}
	{@const endArray = averagedEndResults}
	<Table
		header={[
			'',
			'Dynamic 1',
			'Dynamic 2',
			'Dynamic 3',
			'Dynamic 4',
			'Dynamic 5',
			'Dynamic 6',
			'Dynamic 7',
			'Dynamic 8'
		]}
		rows={[
			['Start', ...startArray.map((v) => v.toFixed(2))],
			['End', ...endArray.map((v) => v.toFixed(2))],
			[
				'Shift',
				...startArray.map(
					(s, i) => `${endArray?.[i] - s > 0 ? '+' : ''}${(endArray?.[i] - s)?.toFixed(2)}`
				)
			]
		]}
	/>
{/if}

<style>
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

	h2 {
		font-family: 'Instrument Serif', serif;
	}
</style>
