<script lang="ts">
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import { formatAveragedAnsers } from '$lib/helpers/results.js';
	import { useQuery } from '@sveltestack/svelte-query';

	let { data } = $props();
	console.log('DATA?', data);

	const queryResult = useQuery('repoData', async () => {
		return fetch('https://api.github.com/repos/SvelteStack/svelte-query').then((res) => res.json());
	});
</script>

<h1 class="title">Facilition Data</h1>

<p>Browse data from collective polls run by <strong>trained facilitators</strong>.</p>

<h2 class="title small">All Facilitations</h2>
{#if data?.paginatedGroups?.length > 0}
	<Table
		header={[
			'Facilitation',
			'Facilitator',
			'Start Poll Date',
			'End Poll Date'
			// 'Start Total Average',
			// 'End Total Average'
		]}
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
			// stat.singleValueAverageStart ? stat.singleValueAverageStart.toFixed(2) : 'N/A',
			// stat.singleValueAverageEnd ? stat.singleValueAverageEnd.toFixed(2) : 'N/A'
		])}
	/>
	<Pagination {data} />
{:else}
	<p>No facilitations to display.</p>
{/if}

<hr />

<h2 class="title small">Aggregated Stats</h2>

{#await data.slowData}
	<p>Loading statistics ...</p>
{:then data}
	<p></p>
	<!-- D1: 4.4 > 4.8
D2: 3.8 > 4.2
D3: 3.4 > 4.2
D4: 3.0 > 4.2
D5: 3.2 > 4.0
D6: 2.8 > 4.0
D7: 3.0 > 4.0
D8: 3.7 > 4.4 -->

	{#if data?.stats?.length > 0 && data.totalAverageStart?.[0] && data.totalAverageEnd?.[0]}
		{@const totalAverageStart = [4.4, 3.8, 3.4, 3.0, 3.2, 2.8, 3.0, 3.7]}
		{@const totalAverageEnd = [4.8, 4.2, 4.2, 4.2, 4.0, 4.0, 4.0, 4.4]}
		<AdminAnswerComparison
			startAnswers={formatAveragedAnsers(totalAverageStart)}
			endAnswers={formatAveragedAnsers(totalAverageEnd)}
			averagedStartResults={data.totalAverageStart}
			averagedEndResults={data.totalAverageEnd}
		/>

		<!-- <p class="note">TODO: Add date range? What are helpful pre-defined ranges?</p>
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
				['Start', ...data.totalAverageStart.map((v) => v.toFixed(2))],
				['End', ...data.totalAverageEnd.map((v) => v.toFixed(2))],
				[
					'Shift',
					...data.totalAverageStart.map(
						(s, i) =>
							`${data.totalAverageEnd?.[i] - s > 0 ? '+' : ''}${(data.totalAverageEnd?.[i] - s)?.toFixed(2)}`
					)
				]
			]}
		/> -->
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
