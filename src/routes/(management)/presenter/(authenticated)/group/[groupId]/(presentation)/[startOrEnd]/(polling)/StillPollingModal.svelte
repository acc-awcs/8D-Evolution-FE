<script>
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Modal from '$lib/components/Modal.svelte';
	import { qr } from '@svelte-put/qr/svg';

	let { pollCode, onClose } = $props();
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Paused for Inactivity</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<p>To keep things efficient, we've temporarily paused the polling.</p>
	<div class="buttons">
		<button class="btn primary large" type="button" onclick={onClose}>Resume</button>
	</div>
</Modal>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
