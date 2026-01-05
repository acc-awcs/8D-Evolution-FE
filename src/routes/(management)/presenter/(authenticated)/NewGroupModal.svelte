<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { FACILITATOR } from '$lib/constants';

	let { onClose, data } = $props();
	let loading = $state(false);
	const currentUTCYear = new Date().getUTCFullYear();
	const startYear = 2025;
	// Show year options starting from 2025 and ending two beyond the current year
	const yearDiff = currentUTCYear + 2 - startYear;
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
				<select required name="year" value={`${currentUTCYear}`}>
					{#each { length: yearDiff } as _, i}
						<option value={`${startYear + i}`}>{startYear + i}</option>
					{/each}
				</select>
			</label>
		{:else}
			<p>
				We recommend choosing a name for the specific session you'll be facilitating. For example,
				"University of Michigan, Fall {currentUTCYear}".
			</p>
			<label>
				Group Name
				<input type="text" name="name" />
			</label>
		{/if}
		<button class="btn primary large" type="submit" disabled={loading} class:loading>
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
