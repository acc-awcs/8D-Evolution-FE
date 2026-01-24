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

	// const query = createQuery({
	//   queryKey: ['live-data'],
	//   queryFn: fetchData,
	//   refetchInterval: 5000, // Polls every 5 seconds
	//   // Add other options as needed, such as initialData, staleTime, etc.
	// })

	function callActionFromScript() {
		formElement.submit();
	}
</script>

<!-- {#if $countQuery.isLoading}
    <span>Loading...</span>
{:else if $countQuery.isError}
    <span>Error: {$countQuery.error.message}</span>
{:else}
    <h1>Current Count: {$countQuery.data.dynamicCount}</h1>
{/if} -->

<h1 class="title large">Map Our Collective {data.isStart ? 'Starting' : 'Ending'} Point</h1>

<div class="wrapper">
	<div class="option qr">
		<svg
			class="qrcode"
			use:qr={{
				data: `${PUBLIC_BASE_URL}/poll/${data.pollCode}`
			}}
		/>
		<p>Scan QR Code</p>
	</div>
	<div class="or">OR</div>
	<div class="option visit">
		<p>Visit</p>
		<p class="poll-link">{shortenUrl(`${PUBLIC_BASE_URL}/poll`)}</p>
		<p>and enter code</p>
		<p class="code">
			<span>{data.pollCode.slice(0, 3)}</span><span>{data.pollCode.slice(3, 6)}</span>
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
	numLabel="Ready"
	nextLabel={`Start Quiz For Participants`}
	role={data.role}
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
		}
	}
</style>
