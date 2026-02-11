<script>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { onDestroy } from 'svelte';
	import ComparisonChartDisplay from '../../ComparisonChartDisplay.svelte';

	let { data } = $props();
</script>

<ComparisonChartDisplay {data} />

<PresentationFooter
	nextLabel="Close"
	onNext={() => goto(`/groups/g/${data.group._id}`)}
	onPrev={() => goto(`/groups/g/${data.group._id}/${data.startOrEnd}/review`)}
/>
