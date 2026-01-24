<script>
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Modal from '$lib/components/Modal.svelte';
	import { qr } from '@svelte-put/qr/svg';

	let { pollCode, onClose } = $props();
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">QR Code</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<div class="qr-wrapper">
		<svg
			class="qrcode"
			use:qr={{
				data: `${PUBLIC_BASE_URL}/poll/${pollCode}`
			}}
		/>
	</div>
	<button class="btn primary large" type="button" onclick={onClose}> Done </button>
</Modal>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.qr-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 16px;
	}
	.qrcode {
		width: 280px;
		height: 280px;
		padding: 10px;
		background-color: var(--cloud);
		border-radius: var(--br);
	}
</style>
