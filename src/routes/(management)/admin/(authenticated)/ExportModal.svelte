<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { exportAndDownloadCsv } from '$lib/helpers/general';

	let { onClose } = $props();
	let loading = $state(false);
	let generated = $state(false);
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Export Data</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<form
		method="POST"
		action="?/export"
		use:enhance={() => {
			loading = true;
			return async ({ update, result }) => {
				await update();
				loading = false;
				if (result?.data?.success) {
					const rows = result.data.rows;
					exportAndDownloadCsv(rows, 'trained-facilitator-data.csv');
					generated = true;
				}
			};
		}}
	>
		{#if !generated}
			<p>
				Generate an export of the trained facilitator dataset. Your export will be automatically
				downloaded.
			</p>
			<div class="buttons">
				<button class="btn secondary large" type="button" onclick={onClose}>Cancel</button>
				<button class="btn large primary" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Download Export
					{/if}
				</button>
			</div>
		{:else}
			<p>Your export has been generated.</p>
			<div class="buttons">
				<button class="btn primary large" type="button" onclick={onClose}>Done</button>
			</div>
		{/if}
	</form>
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
	}
</style>
