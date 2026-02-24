<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { onClose, surveyId } = $props();
	let loading = $state(false);
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Delete Survey Response</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<p>Are you sure you want to delete this survey response? This cannot be undone.</p>
	<form
		method="POST"
		action="?/delete"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
				onClose();
			};
		}}
	>
		<input type="hidden" name="surveyId" value={surveyId} />
		<div class="buttons-init">
			<button class="btn secondary large" type="button" onclick={onClose}> Cancel </button>
			<button class="btn primary large" type="submit" disabled={loading} class:loading>
				{#if loading}
					<ButtonLoader />
				{:else}
					Yes, delete this response
				{/if}
			</button>
		</div>
	</form>
</Modal>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.buttons-init {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 16px;
	}
</style>
