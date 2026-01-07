<script>
	import Table from '$lib/components/Table.svelte';

	let { data } = $props();

	console.log('DATA', data);
</script>

<h1 class="title">Facilition Data</h1>

<Table
	header={[
		'Facilitator',
		'Group',
		'Start Poll Date',
		'End Poll Date',
		'Start Total Average',
		'End Total Average'
	]}
	rows={data.stats.map((stat) => [
		stat.group.creatorShortName,
		stat.group.name,
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
