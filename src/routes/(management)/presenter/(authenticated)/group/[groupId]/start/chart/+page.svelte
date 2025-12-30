<script>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { onDestroy } from 'svelte';

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

	// TODO: need to stop polling at some point, or nah?
</script>

<h1 class="title">Our Collective Starting Point</h1>

<PresentationFooter
	num={data.group.collectiveStartReady.length}
	numLabel="Ready"
	onNext={null}
	onPrev={() => goto(`/presenter/group/${data.group._id}/start`)}
/>

<style>
	.title {
		text-align: center;
		margin-top: 0px;
	}

	@media screen and (max-width: 800px) {
		.wrapper {
			flex-direction: column;
		}
	}
</style>
