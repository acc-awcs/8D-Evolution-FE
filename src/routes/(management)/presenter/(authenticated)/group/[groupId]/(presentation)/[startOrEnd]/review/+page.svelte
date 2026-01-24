<script>
	import { goto } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import SingleChartDisplay from '../SingleChartDisplay.svelte';

	let { data } = $props();
</script>

<!-- <h1 class="title">Our Collective {data.isStart ? 'Starting' : 'Ending'} Point</h1> -->

<SingleChartDisplay results={data.matchingResults} />

{#if data.isStart}
	<PresentationFooter
		nextLabel="Close Review"
		onNext={() => goto(`/presenter/group/${data.group._id}`)}
		skipPrev={true}
	/>
{:else}
	<PresentationFooter
		nextLabel="View Shift"
		onNext={() => goto(`/presenter/group/${data.group._id}/${data.startOrEnd}/review/comparison`)}
	/>
{/if}

<style>
	.title {
		text-align: center;
		margin-top: 10px;
	}
</style>
