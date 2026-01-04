<script>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { onDestroy } from 'svelte';
	import ComparisonChartDisplay from '../../ComparisonChartDisplay.svelte';

	// Only run this on the client side
	if (browser) {
		const interval = setInterval(() => {
			console.log('Polling for new data...');
			invalidateAll();
		}, 3000); // Polls every 3 seconds

		// Clean up the interval when the component is destroyed
		onDestroy(() => {
			clearInterval(interval);
		});
	}

	let { data } = $props();
</script>

<ComparisonChartDisplay {data} />

<PresentationFooter
	nextLabel="End Poll"
	onNext={() => goto(`/presenter/group/${data.group._id}`)}
	onPrev={() => goto(`/presenter/group/${data.group._id}/end/responses`)}
/>
