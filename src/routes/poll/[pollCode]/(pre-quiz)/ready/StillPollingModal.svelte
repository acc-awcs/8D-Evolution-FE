<script>
	import Modal from '$lib/components/Modal.svelte';
	let { onClose } = $props();
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Resume Session</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<p>We’ve paused searching for a poll due to inactivity.</p>
	<div class="buttons">
		<button class="btn large primary" type="button" onclick={onClose}>Continue</button>
	</div>
</Modal>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
