<script>
	import Modal from '$lib/components/Modal.svelte';
	let { onClose } = $props();
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Paused for Inactivity</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<p>To keep things efficient, we’ve temporarily paused the polling.</p>
	<div class="buttons">
		<button class="btn large primary" type="button" onclick={onClose}>Resume</button>
	</div>
</Modal>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
