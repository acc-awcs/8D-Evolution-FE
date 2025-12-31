<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { FACILITATOR, GROUP_LEAD } from '$lib/constants';

	let { startOrEnd, onClose, data } = $props();
	let loading = $state(false);
	console.log('DATA', data);
</script>

<Modal handleClose={onClose}>
	{#if startOrEnd === 'start'}
		<div class="header">
			<h1>Retake Poll</h1>
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
			<p>This will clear out all previous data and begin a new poll with a new code.</p>
			<input type="hidden" name="isStart" value="true" />
			<div class="buttons">
				<button class="btn secondary large" type="button" onclick={onClose}>Cancel</button>
				<button class="btn primary large" type="submit" disabled={loading}>
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
			<h1>Retake Collective Ending Point</h1>
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
			<input type="hidden" name="isStart" value="true" />
			<div class="buttons">
				<button class="btn secondary large" type="button" onclick={onClose}>
					No, take me back
				</button>
				<button class="btn primary large" type="submit" disabled={loading}>
					{#if loading}
						<ButtonLoader />
					{:else}
						Yes, retake poll
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
	input,
	select {
		background-color: #fff;
	}
	.buttons-init {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 16px;
	}
	.buttons {
		display: flex;
		gap: 10px;
	}
</style>
