<script lang="ts">
	import Table from '$lib/components/Table.svelte';

	// let { data } = $props();
</script>

<h1 class="title">Group Data</h1>

<p>Browse data from collective polls run by <strong>group leads</strong>.</p>

<p class="note">Will populate this once the facilitator interface is finished & approved!</p>

<!-- <h2 class="title small">Average Results By Dynamic</h2>

{#if data?.stats?.length > 0 && data.totalAverageStart?.[0] && data.totalAverageEnd?.[0]}
	<p class="note">TODO: Add date range? What are helpful pre-defined ranges?</p>
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
	/>
{:else}
	<p>No complete groups available to display statistics. Check back later!</p>
{/if}

<h2 class="title small">All Groups</h2>
{#if data?.stats?.length > 0}
	<Table
		header={[
			'Facilitation',
			'Group Lead Email',
			'Start Poll Date',
			'End Poll Date'
			// 'Start Total Average',
			// 'End Total Average'
		]}
		rowLinks={data.stats.map((s: any) => `/admin/facilitation/${s.group._id}`)}
		rows={data.stats.map((stat: any) => [
			stat.group.name,
			stat.user?.email || 'N/A',
			stat.group.startPollDate
				? new Date(stat.group.startPollDate).toLocaleString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})
				: 'N/A',
			stat.group.endPollDate
				? new Date(stat.group.endPollDate).toLocaleString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})
				: 'N/A'
			// stat.singleValueAverageStart ? stat.singleValueAverageStart.toFixed(2) : 'N/A',
			// stat.singleValueAverageEnd ? stat.singleValueAverageEnd.toFixed(2) : 'N/A'
		])}
	/>
{:else}
	<p>No groups to display.</p>
{/if} -->

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
