<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { startOrEnd, hasEndData, onClose } = $props();
	let loading = $state(false);
</script>

<Modal handleClose={onClose}>
	{#if startOrEnd === 'start'}
		<div class="header">
			<h1 class="title small">Retake Poll</h1>
			<button onclick={onClose} class="close link-like" type="button">Close</button>
		</div>
		<form
			method="POST"
			action="?/beginPoll"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
					onClose();
				};
			}}
		>
			{#if hasEndData}
				<p>
					This will clear out all previously submitted data (including ending point data) and begin
					a new poll.
				</p>
			{:else}
				<p>This will clear out all previously submitted data and begin a new poll.</p>
			{/if}
			<input type="hidden" name="isStart" value="true" />
			<div class="buttons">
				<button class="btn secondary large" type="button" onclick={onClose}>Cancel</button>
				<button class="btn primary large" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Retake Poll
					{/if}
				</button>
			</div>
		</form>
	{:else}
		<div class="header">
			<h1 class="title small">Retake Poll</h1>
			<button onclick={onClose} class="close link-like" type="button">Close</button>
		</div>
		<p>This will clear out all previously submitted ending point data and begin a new poll.</p>
		<form
			method="POST"
			action="?/beginPoll"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
					onClose();
				};
			}}
		>
			<input type="hidden" name="isStart" value="false" />
			<div class="buttons">
				<button class="btn secondary large" type="button" onclick={onClose}> Cancel </button>
				<button class="btn large primary" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Retake Poll
					{/if}
				</button>
			</div>
		</form>
	{/if}
</Modal>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.buttons {
		display: flex;
		gap: 10px;
		margin-top: 36px;
	}
</style>
