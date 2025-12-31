<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
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

<h1 class="title">Hang Tight ...</h1>
<p>You're all set!</p>
<p>Once your facilitator starts the session, this page will automatically update.</p>
