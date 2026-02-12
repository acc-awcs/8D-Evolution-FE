<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { POLLING_COUNT_MAX } from '$lib/constants.js';
	import { shortenUrl } from '$lib/helpers/general';
	import { qr } from '@svelte-put/qr/svg';
	import { onMount } from 'svelte';
	import StillPollingModal from './(polling)/StillPollingModal.svelte';

	let { data: loadData } = $props();
	let intervalId = $state(undefined);
	let data = $state(loadData);
	let intervalCount = $state(0);
	let showContinuePrompt = $state(false);

	const groupId = loadData?.groupId;
	const isStart = loadData?.isStart;
	const role = loadData?.role;

	async function fetchData() {
		if (intervalCount < POLLING_COUNT_MAX) {
			try {
				const response = await fetch(`/api/poll/${groupId}`);
				if (response.ok) {
					const result = await response.json();
					data = result.data;
				} else {
					console.error('Failed to fetch data');
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

	let formElement: HTMLFormElement;

	let numReady = $derived(
		isStart
			? data.group.startPollReadyParticipants.length
			: data.group.endPollReadyParticipants.length
	);

	let pollCode = $derived(isStart ? data.group.startPollCode : data.group.endPollCode);

	function callActionFromScript() {
		formElement.submit();
	}
</script>

{#if showContinuePrompt}
	<StillPollingModal
		onClose={() => {
			intervalCount = 0;
			showContinuePrompt = false;
		}}
		{pollCode}
	/>
{/if}

<h1 class="title large">
	{#if isStart}
		Let's Map Our Collective Starting Point
	{:else}
		Join Collective Ending Point Poll
	{/if}
</h1>

<div class="wrapper">
	<div class="option qr">
		<svg
			class="qrcode"
			use:qr={{
				data: `${PUBLIC_BASE_URL}/poll/${pollCode}`
			}}
		/>
		<p>Scan QR Code</p>
	</div>
	<div class="or">OR</div>
	<div class="option visit">
		<p>Visit</p>
		<p class="poll-link">{shortenUrl(`${PUBLIC_BASE_URL}/poll`)}</p>
		<p>Enter Code</p>
		<p class="code">
			<span>{pollCode?.slice(0, 3)}</span><span>{pollCode?.slice(3, 6)}</span>
		</p>
	</div>
</div>

<form
	aria-hidden="true"
	method="POST"
	action="?/updateGroup"
	use:enhance
	bind:this={formElement}
></form>

<PresentationFooter
	num={numReady}
	numLabel="Ready!"
	nextLabel={`Begin Poll`}
	{role}
	helper={`${numReady} participant${numReady !== 1 ? 's are' : ' is'} ready. Once all participants are ready, start the quiz.`}
	onNext={numReady > 0 ? callActionFromScript : null}
/>

<style>
	.wrapper {
		display: flex;
		align-items: space-around;
		gap: 60px;
		margin-top: 30px;
		padding: 0px 40px;
		padding-bottom: 30px;
	}
	.option {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		/* background-color: var(--cloud-light); */
		padding: 40px 0px;
		border-radius: var(--br);
		border: 1px solid var(--periwinkle);
	}
	.visit {
		justify-content: center;
		gap: 12px;
		border: 1px solid var(--onyx);
	}
	.title {
		text-align: center;
		margin-top: 0px;
		margin-bottom: 30px;
	}
	.qr {
		background-color: var(--periwinkle);
	}
	.qrcode {
		width: 280px;
		height: 280px;
		padding: 10px;
		background-color: var(--cloud);
		border-radius: var(--br);
	}
	.or {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		font-size: 26px;
	}
	.poll-link {
		font-size: 24px;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		margin-top: 8px;
		margin-bottom: 30px;
	}
	.code {
		padding: 16px;
		padding-bottom: 12px;
		font-size: 26px;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		font-weight: 700;
		color: var(--onyx);
		background-color: var(--neon);
		border-radius: 10px;
		border: none;
	}
	.code span {
		padding: 0px 4px;
		letter-spacing: 4px;
	}
	p {
		margin: 0px;
	}
	.qr p {
		margin: 10px 0px;
		font-size: 20px;
		font-weight: 700;
	}

	@media screen and (max-width: 800px) {
		.wrapper {
			flex-direction: column;
			padding: 0px;
		}
	}
</style>
