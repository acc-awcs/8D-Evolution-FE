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
		endResults = null,
		group = null
	} = $props();

	const startParticipants = $derived(
		group?.manualEntry ? group.manualNumParticipants : startResults?.length
	);
	const endParticipants = $derived(
		group?.manualEntry ? group.manualNumParticipants : endResults?.length
	);

	const isValid = (v) => v && !Array.isArray(v);
</script>

{#if startAnswers || endAnswers}
	<div class="chart-wrapper">
		{#if startAnswers && startAnswers['A'] && !Array.isArray(startAnswers['A'])}
			<div class="chart" aria-hidden="true" bind:clientWidth={startChartWidth}>
				<h3 class="uppercase-title">Starting Point</h3>
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
						Averaged results from {startParticipants} response{startParticipants === 1 ? '' : 's'} on
						{new Date(startPollDate).toLocaleString('en-US', {
							// weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				{/if}
			</div>
		{/if}
		{#if endAnswers && endAnswers['A'] && !Array.isArray(endAnswers['A'])}
			<div class="chart" aria-hidden="true" bind:clientWidth={endChartWidth}>
				<h3 class="uppercase-title">Ending Point</h3>

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
						Averaged results from {endParticipants} response{endParticipants === 1 ? '' : 's'} on
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
				'Change',
				...startArray.map(
					(s, i) => `${endArray?.[i] - s > 0 ? '+' : ''}${(endArray?.[i] - s)?.toFixed(2)}`
				)
			],
			[
				'% Change',
				...startArray.map(
					(s, i) =>
						`${endArray?.[i] - s > 0 ? '+' : ''}${(((endArray?.[i] - s) / s) * 100)?.toFixed(1)}%`
				)
			]
		]}
	/>
{:else if isValid(averagedStartResults?.[0])}
	{@const startArray = averagedStartResults}
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
		rows={[['Start', ...startArray.map((v) => v.toFixed(2))]]}
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
	h3 {
		margin: 30px 0px;
	}
</style>
