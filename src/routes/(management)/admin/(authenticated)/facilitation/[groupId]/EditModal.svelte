<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { onClose, data } = $props();
	let loading = $state(false);
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Edit Facilitation</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<form
		method="POST"
		action="?/edit"
		use:enhance={() => {
			loading = true;
			return async ({ update, result }) => {
				await update();
				loading = false;
				if (result?.data?.success) {
					onClose();
				}
			};
		}}
	>
		<input type="hidden" name="groupId" value={data.group?._id} />
		<label>
			Is this a test facilitation?
			<select required name="isTest" value={data.group?.isTest ? 'true' : 'false'}>
				<option value="false">No, these are results from a live facilitation.</option>
				<option value="true">Yes, this was created as a test.</option>
			</select>
		</label>
		<div class="buttons">
			<button class="btn secondary large" type="button" onclick={onClose}>Cancel</button>
			<button class="btn large primary" type="submit" disabled={loading} class:loading>
				{#if loading}
					<ButtonLoader />
				{:else}
					Save
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
	input,
	select {
		background-color: #fff;
	}
	.buttons {
		display: flex;
		gap: 10px;
	}
</style>
