<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { FACILITATOR, GROUP_START_YEAR } from '$lib/constants';
	import { getCurrentMonth, getYearDiff } from '$lib/helpers/general';

	let { onClose, data } = $props();
	let loading = $state(false);
	const currentUTCYear = new Date().getUTCFullYear();
	// Show year options starting from 2025 and ending two beyond the current year
	const yearDiff = getYearDiff();
</script>

<Modal handleClose={onClose}>
	<div class="header">
		<h1 class="title small">Create New Group</h1>
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
				Group Name
				<input
					type="text"
					name="organization"
					value={data?.organization}
					placeholder="University of XYZ, etc."
				/>
			</label><label>
				Month of Facilitation
				<select required name="month" value={getCurrentMonth()}>
					<option value="">Select month</option>
					<option value="January">January</option>
					<option value="February">February</option>
					<option value="March">March</option>
					<option value="April">April</option>
					<option value="May">May</option>
					<option value="June">June</option>
					<option value="July">July</option>
					<option value="August">August</option>
					<option value="September">September</option>
					<option value="October">October</option>
					<option value="November">November</option>
					<option value="December">December</option>
				</select>
			</label><label>
				Year of Facilitation
				<select required name="year" value={`${currentUTCYear}`}>
					{#each { length: yearDiff } as _, i}
						<option value={`${GROUP_START_YEAR + i}`}>{GROUP_START_YEAR + i}</option>
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
		<button class="btn large primary" type="submit" disabled={loading} class:loading>
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
