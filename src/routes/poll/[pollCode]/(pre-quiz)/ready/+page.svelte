<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';
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
</script>

<DecorativeBackground opacity={true} />

<h1 class="title">You're All Set!</h1>
<p>Hang tight for a minute. Once everyone is aboard, this page will automatically update.</p>

<style>
	h1 {
		margin: 40px 0px;
	}
	p {
		margin: 0px;
		margin-bottom: 12px;
	}
</style>
