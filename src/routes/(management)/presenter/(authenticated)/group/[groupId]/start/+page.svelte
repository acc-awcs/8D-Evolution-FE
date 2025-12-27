<script>
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
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

	// TODO: need to stop polling at some point, or nah?
</script>

<h1 class="title">Map Our Collective Starting Point</h1>

<div class="wrapper">
	<div class="option">
		<h3>Scan QR Code</h3>

		<svg
			class="qrcode"
			use:qr={{
				data: `${PUBLIC_BASE_URL}/q/${data.group.startingPointCode}`
				// logo: 'https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg',
				// shape: 'circle',
			}}
		/>
	</div>
	<div class="or">OR</div>
	<div class="option visit">
		<h3>Visit</h3>
		<p class="poll-link">{shortenUrl(`${PUBLIC_BASE_URL}/poll`)}</p>
		<p>and enter code</p>
		<p class="code">{data.group.startingPointCode}</p>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		align-items: stretch;
		gap: 28px;
		margin-top: 60px;
		padding-bottom: 30px;
	}
	.option {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		background-color: var(--cloud-dark);
		padding: 40px 20px;
		border-radius: var(--br);
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
		background-color: var(--cloud);
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
