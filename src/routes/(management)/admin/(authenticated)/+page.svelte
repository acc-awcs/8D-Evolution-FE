<script lang="ts">
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import { formatAveragedAnsers } from '$lib/helpers/results.js';

	let { data } = $props();
</script>

<h1 class="title">Facilition Data</h1>

<p>Browse data from collective polls run by <strong>trained facilitators</strong>.</p>

<!-- <h2 class="title small">Beep</h2> -->

{#await data.chartData}
	<p>Loading statistics ...</p>
{:then data}
	{@const cool = console.log('CD', data)}
	<LineChart {data} />
{/await}

<h2 class="title small">All Facilitations</h2>
{#if data?.paginatedGroups?.length > 0}
	<Table
		header={['Facilitation', 'Facilitator', 'Start Poll Date', 'End Poll Date']}
		rowLinks={data.paginatedGroups.map((group: any) => `/admin/facilitation/${group._id}`)}
		rows={data.paginatedGroups.map((group: any) => [
			group.name,
			group.creatorShortName,
			group.startPollDate
				? new Date(group.startPollDate).toLocaleString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})
				: 'N/A',
			group.endPollDate
				? new Date(group.endPollDate).toLocaleString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})
				: 'N/A'
		])}
	/>
	<Pagination {data} />
{:else}
	<p>No facilitations to display.</p>
{/if}

<hr />

<h2 class="title small">Aggregated Stats</h2>

{#await data.aggregateData}
	<p>Loading statistics ...</p>
{:then data}
	<p></p>
	{#if data?.stats?.length > 0 && data.totalAverageStart?.[0] && data.totalAverageEnd?.[0]}
		{@const totalAverageStart = [4.4, 3.8, 3.4, 3.0, 3.2, 2.8, 3.0, 3.7]}
		{@const totalAverageEnd = [4.8, 4.2, 4.2, 4.2, 4.0, 4.0, 4.0, 4.4]}
		<AdminAnswerComparison
			startAnswers={formatAveragedAnsers(totalAverageStart)}
			endAnswers={formatAveragedAnsers(totalAverageEnd)}
			averagedStartResults={data.totalAverageStart}
			averagedEndResults={data.totalAverageEnd}
		/>
	{:else}
		<p>No complete facilitations available to display statistics. Check back later!</p>
	{/if}
{/await}

<div class="space"></div>

<style>
	.title.small {
		margin-top: 60px;
	}
	.space {
		width: 100%;
		padding-bottom: 100px;
	}
</style>
