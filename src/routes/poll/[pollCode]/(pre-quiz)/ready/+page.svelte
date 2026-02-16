<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';
	import { POLLING_COUNT_MAX } from '$lib/constants.js';
	import { onMount } from 'svelte';
	import StillPollingModal from './StillPollingModal.svelte';

	let { data: loadData } = $props();
	let intervalId = $state(null);
	let intervalCount = $state(0);
	let showContinuePrompt = $state(false);

	async function fetchData() {
		if (intervalCount < POLLING_COUNT_MAX) {
			try {
				const response = await fetch(
					`${PUBLIC_SERVER_URL}/api/poll/ready?pollToken=${loadData.pollToken}&pollCode=${loadData.pollCode}`,
					{
						method: 'GET'
					}
				);
				if (response.ok) {
					const body = await response.json();
					if (body.pollHasBeenInitiated && !body.alreadySubmitted) {
						// Apply pollToken if one doesn't exist yet for this user and this quiz.
						if (body.newPollToken) {
							await fetch('/api/poll/ready', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({ newPollToken: body.newPollToken })
							});
						}
						goto(`/poll/${loadData.pollCode}/quiz`);
					}
				} else {
					goto(`/poll`);
				}
			} catch (error) {
				console.error('Error during fetch:', error);
			}
			intervalCount += 1;
		} else {
			if (!showContinuePrompt) {
				showContinuePrompt = true;
			}
		}
	}

	// Start polling
	onMount(() => {
		fetchData();
		intervalId = setInterval(fetchData, 5000);
		return () => clearInterval(intervalId);
	});

	// // Only run this on the client side
	// if (browser) {
	// 	const interval = setInterval(() => {
	// 		console.log('Polling for new data...');
	// 		invalidateAll();
	// 	}, 3000); // Polls every 3 seconds

	// 	// Clean up the interval when the component is destroyed
	// 	onDestroy(() => {
	// 		clearInterval(interval);
	// 	});
	// }
</script>

{#if showContinuePrompt}
	<StillPollingModal
		onClose={() => {
			intervalCount = 0;
			showContinuePrompt = false;
		}}
	/>
{/if}

<DecorativeBackground opacity={true} />

<h1 class="title">You're All Set!</h1>
<p>
	Hang tight for a minute. Once everyone is aboard and your facilitator begins the poll, this page
	will automatically update.
</p>

<style>
	h1 {
		margin: 40px 0px;
	}
	p {
		margin: 0px;
		margin-bottom: 12px;
	}
</style>
