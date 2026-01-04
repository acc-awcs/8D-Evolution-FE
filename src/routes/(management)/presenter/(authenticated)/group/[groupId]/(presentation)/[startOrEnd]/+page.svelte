<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { shortenUrl } from '$lib/helpers/general';
	import { qr } from '@svelte-put/qr/svg';
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
	let formElement: HTMLFormElement;

	let numReady = $derived(
		data.isStart
			? data.group.startPollReadyParticipants.length
			: data.group.endPollReadyParticipants.length
	);

	function callActionFromScript() {
		formElement.submit();
	}
</script>

<h1 class="title">Join Collective {data.isStart ? 'Starting' : 'Ending'} Point Poll</h1>

<div class="wrapper">
	<div class="option clear">
		<h3>Scan QR Code</h3>

		<svg
			class="qrcode"
			use:qr={{
				data: `${PUBLIC_BASE_URL}/poll/${data.pollCode}`
			}}
		/>
	</div>
	<div class="or">OR</div>
	<div class="option visit">
		<h3>Visit</h3>
		<p class="poll-link">{shortenUrl(`${PUBLIC_BASE_URL}/poll`)}</p>
		<p>and enter code</p>
		<p class="code">{data.pollCode}</p>
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
	numLabel="Ready"
	nextLabel={`Start Quiz For Participants`}
	helper={`Currently, ${numReady} participant${numReady !== 1 ? 's are' : ' is'} ready.\nOnce all participants are ready, start the quiz.`}
	onNext={numReady > 0 ? callActionFromScript : null}
/>

<style>
	.wrapper {
		display: flex;
		align-items: space-around;
		gap: 60px;
		margin-top: 60px;
		padding: 0px 40px;
		padding-bottom: 30px;
	}
	.option {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		background-color: var(--cloud-light);
		padding: 40px 0px;
		border-radius: var(--br);
		border: 1px solid var(--cloud-dark);
	}
	.visit {
		justify-content: center;
		gap: 36px;
	}
	.title {
		text-align: center;
		margin-top: 0px;
	}
	.qrcode {
		width: 300px;
		height: 300px;
	}
	.or {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 1000;
		font-size: 16px;
	}
	.poll-link {
		font-size: 2rem;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		margin: 6px 0px;
	}
	.code {
		padding: 20px 20px;
		padding-bottom: 16px;
		letter-spacing: 10px;
		font-size: 2.5rem;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		font-weight: 1000;
		color: var(--onyx);
		background-color: var(--cloud-dark);
		border-radius: 10px;
		border: none;
	}
	p,
	h3 {
		margin: 0px;
	}

	@media screen and (max-width: 800px) {
		.wrapper {
			flex-direction: column;
		}
	}
</style>
