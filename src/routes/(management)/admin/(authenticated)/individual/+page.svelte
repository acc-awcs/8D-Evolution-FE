<script lang="ts">
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import TimeRangePicker from '$lib/components/TimeRangePicker.svelte';
	import { formatAveragedAnswers } from '$lib/helpers/results.js';
	let { data } = $props();
</script>

<h1 class="title large">Individual User Data</h1>

<p>
	Browse data from 8 Dynamics polls taken by <strong>individual Climate Wayfinding readers</strong>.
</p>

<TimeRangePicker {data} />

{#if data?.invalidTimes}
	<p>{data.msg}</p>
{:else if data?.paginatedResults?.length > 0}
	<h2 class="title">Activity</h2>
	<div class="wrapper">
		<div class="callout">
			<div class="item">
				<h3 class="uppercase-title">Total Start Polls</h3>
				<p class="title large">{data.totalStartResults}</p>
			</div>
			<div class="item">
				<h3 class="uppercase-title">Total End Polls</h3>
				<p class="title large">{data.totalEndResults}</p>
			</div>
			<div class="item">
				<h3 class="uppercase-title">Total Poll Syncs</h3>
				<p class="title large">{data.totalPairedResults}</p>
			</div>
		</div>
		{#if data?.resultsByMonth?.length > 1}
			{#key `${data.query.startDate} ${data.query.endDate} ${data.query.timeRange}`}
				<LineChart
					data={data?.resultsByMonth}
					keys={[
						{
							label: 'Start Polls',
							id: 'numStartResults'
						},
						{
							label: 'End Polls',
							id: 'numEndResults'
						}
					]}
				/>
			{/key}
		{/if}
	</div>
	<h2 class="title">Shifts</h2>
	<div class="wrapper">
		<AdminAnswerComparison
			startAnswers={formatAveragedAnswers(data.averagedStartResults)}
			endAnswers={formatAveragedAnswers(data.averagedEndResults)}
			averagedStartResults={data.averagedStartResults}
			averagedEndResults={data.averagedEndResults}
		/>
	</div>
{:else}
	<p>No data to display. Check back later!</p>
{/if}

<div class="space"></div>

<style>
	.callout {
		display: flex;
		justify-content: space-around;
	}
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin: 30px;
		/* gap: 30px; */
	}
	.item p {
		margin: 0px;
	}
	h2 {
		margin-top: 60px;
	}
	.space {
		width: 100%;
		padding-bottom: 100px;
	}
	.alt-wrapper {
		padding: 12px 0px;
	}
	.wrapper {
		margin-bottom: 80px;
		/* background-color: var(--cloud-light); */
		border: 1px solid var(--cloud-darker);
		border-radius: var(--br);
		padding: 12px;
		margin-left: -12px;
		margin-right: -12px;
	}
</style>
