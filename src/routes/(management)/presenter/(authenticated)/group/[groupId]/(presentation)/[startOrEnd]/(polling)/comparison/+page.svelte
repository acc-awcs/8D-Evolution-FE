<script>
	import { goto } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import ComparisonChartDisplay from '../../ComparisonChartDisplay.svelte';

	let { data } = $props();
</script>

<ComparisonChartDisplay {data} />

<PresentationFooter
	nextLabel="End Poll"
	onNext={() => goto(`/presenter/group/${data.group._id}`)}
	onPrev={() => goto(`/presenter/group/${data.group._id}/end/responses`)}
/>
