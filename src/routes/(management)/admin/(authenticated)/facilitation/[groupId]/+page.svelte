<script>
	import DynamicsSimpleComparison from '$lib/components/DynamicsSimpleComparison.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import Table from '$lib/components/Table.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';
	import { formatAnswers } from '$lib/helpers/results';

	let startChartWidth = $state(450);
	let endChartWidth = $state(450);
	let { data } = $props();

	const startAnswers = $derived(
		data.stats?.startResults?.length > 0 ? formatAnswers(data.stats?.startResults) : null
	);

	const endAnswers = $derived(
		data.stats?.endResults?.length > 0 ? formatAnswers(data.stats?.endResults) : null
	);

	const isValid = (v) => v && !Array.isArray(v);

	console.log('HUH', data);
</script>

<br /><br />

<a href="/admin">← Back </a>

<h1 class="title">{data.stats?.group?.name}</h1>

{#if data.stats?.user}
	{@const user = data.stats?.user}
	<p>
		<em
			>Led by {ROLE_PRETTY_NAMES[user.role].toLowerCase()}
			<a href={`/admin/users/${user._id}`}>
				{#if user.firstName}
					{user.firstName} {user.lastName} ({user.email})
				{:else}
					{user.email}
				{/if}
			</a>
		</em>
	</p>
{/if}

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
				<p>
					Averaged results from {data.stats?.startResults?.length} response{data.stats?.startResults
						?.length === 1
						? ''
						: 's'} on {new Date(data.stats?.group.startPollDate).toLocaleString('en-US', {
						// weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
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
				<p>
					Averaged results from {data.stats?.endResults?.length} response{data.stats?.endResults
						?.length === 1
						? ''
						: 's'} on {new Date(data.stats?.group.endPollDate).toLocaleString('en-US', {
						// weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>
		{/if}
	</div>

	<!-- <div class="dynamics-wrapper">
		<DynamicsSimpleComparison
			startAnswers={startAnswers ? Object.values(startAnswers) : null}
			endAnswers={endAnswers ? Object.values(endAnswers) : null}
		/>
	</div> -->
{:else}
	<p>No start or end data is available yet for this group.</p>
{/if}

<br /><br />

{#if isValid(data?.stats?.averagedStartResults?.[0]) && isValid(data?.stats?.averagedEndResults?.[0])}
	{@const startArray = data?.stats?.averagedStartResults}
	{@const endArray = data?.stats?.averagedEndResults}
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
		margin: 20px 0px;
		display: flex;
		justify-content: center;
		padding-bottom: 5vh;
	}
</style>
