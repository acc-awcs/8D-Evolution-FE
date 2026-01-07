<script lang="ts">
	import Table from '$lib/components/Table.svelte';

	let { data } = $props();
</script>

<h1 class="title">Facilition Data</h1>

<a href="/admin/users">USERS</a>

<Table
	header={[
		'Facilitation',
		'Facilitator',
		'Start Poll Date',
		'End Poll Date',
		'Start Total Average',
		'End Total Average'
	]}
	rowLinks={data.stats.map((s: any) => `/admin/group/${s.group._id}`)}
	rows={data.stats.map((stat: any) => [
		stat.group.name,
		stat.group.creatorShortName,
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
			: 'N/A',
		stat.singleValueAverageStart ? stat.singleValueAverageStart.toFixed(2) : 'N/A',
		stat.singleValueAverageEnd ? stat.singleValueAverageEnd.toFixed(2) : 'N/A'
	])}
/>
