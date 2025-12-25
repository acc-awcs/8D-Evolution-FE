<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { FACILITATOR } from '$lib/constants';

	let { onClose, data } = $props();
	let loading = $state(false);
	const currentUTCYear = new Date().getUTCFullYear();
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1>Create New Group</h1>
		<button onclick={onClose} class="close link-like" type="button">Close</button>
	</div>
	<form
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		{#if data.role === FACILITATOR}
			<label>
				Associated Organization or Group
				<input
					type="text"
					name="organization"
					value={data?.organization}
					placeholder="University of XYZ, etc."
				/>
			</label><label>
				Season of Facilitation
				<!-- <input type="text" name="season" /> -->
				<select required name="season">
					<option value="">Select season</option>
					<option value="Spring">Spring</option>
					<option value="Summer">Summer</option>
					<option value="Fall">Fall</option>
					<option value="Winter">Winter</option>
				</select>
			</label><label>
				Year of Facilitation
				<select required name="year">
					<option value={currentUTCYear}>{currentUTCYear}</option>
					<option value={currentUTCYear + 1}>{currentUTCYear + 1}</option>
				</select>
			</label>
		{:else}
			<label>
				Group Name
				<input type="text" name="name" />
			</label>
		{/if}
		<button class="btn primary large" type="submit" disabled={loading}>
			{#if loading}
				<ButtonLoader />
			{:else}
				Create Group
			{/if}
		</button>
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
</style>
