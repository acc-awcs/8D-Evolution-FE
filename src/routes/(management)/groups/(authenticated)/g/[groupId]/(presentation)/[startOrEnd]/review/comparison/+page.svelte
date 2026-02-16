<script>
	import { goto } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import ComparisonChartDisplay from '../../ComparisonChartDisplay.svelte';

	let { data } = $props();
</script>

<ComparisonChartDisplay {data} />

<PresentationFooter
	nextLabel="Close"
	onNext={() => goto(`/groups/g/${data.group._id}`)}
	onPrev={() => goto(`/groups/g/${data.group._id}/${data.startOrEnd}/review`)}
/>
