<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { FACILITATOR, GROUP_LEAD, GROUP_START_YEAR } from '$lib/constants';
	import { getYearDiff } from '$lib/helpers/general';

	const DELETE_MODE = 'delete';
	const EDIT_NAME_MODE = 'edit-name';

	let { onClose, data } = $props();
	let loading = $state(false);
	let mode = $state('unselected');
	const currentUTCYear = new Date().getUTCFullYear();
	// Show year options starting from 2025 and ending two beyond the current year
	const yearDiff = getYearDiff();
</script>

<Modal handleClose={onClose}>
	{#if mode === EDIT_NAME_MODE}
		<div class="header">
			<h1 class="title small">
				Edit Group {#if data.role === GROUP_LEAD}
					Name
				{:else}
					Title
				{/if}
			</h1>
			<button onclick={onClose} class="close link-like" type="button">Close</button>
		</div>
		<form
			method="POST"
			action="?/edit"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
					onClose();
				};
			}}
		>
			<input type="hidden" name="groupId" value={data.group?._id} />
			{#if data.role === FACILITATOR}
				<label>
					Associated Organization or Group
					<input
						type="text"
						name="organization"
						value={data.group?.organization}
						placeholder="University of XYZ, etc."
					/>
				</label><label>
					Month of Facilitation
					<select required name="month" value={data.group?.month}>
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
					<select required name="year" value={`${data.group?.year || currentUTCYear}`}>
						{#each { length: yearDiff } as _, i}
							<option value={`${GROUP_START_YEAR + i}`}>{GROUP_START_YEAR + i}</option>
						{/each}
					</select>
				</label>
			{:else}
				<label>
					Group Name
					<input type="text" name="name" value={data.group?.name} />
				</label>
			{/if}
			<div class="buttons">
				<button class="btn secondary large" type="button" onclick={() => (mode = 'unselected')}>
					← Back
				</button>
				<button class="btn large primary" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Save
					{/if}
				</button>
			</div>
		</form>
	{:else if mode === DELETE_MODE}
		<div class="header">
			<h1 class="title small">Delete Group</h1>
			<button onclick={onClose} class="close link-like" type="button">Close</button>
		</div>
		<p>Are you sure you want to delete this group? This cannot be undone.</p>
		<form
			method="POST"
			action="?/delete"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<input type="hidden" name="groupId" value={data.group?._id} />
			<div class="buttons-init">
				<button class="btn secondary large" type="button" onclick={() => (mode = 'unselected')}>
					No, take me back
				</button>
				<button class="btn primary large" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Yes, delete this group
					{/if}
				</button>
			</div>
		</form>
	{:else}
		<div class="header">
			<h1 class="title small">Group Settings</h1>
			<button onclick={onClose} class="close link-like" type="button">Close</button>
		</div>
		<div class="buttons-init">
			<button class="btn primary large" type="button" onclick={() => (mode = EDIT_NAME_MODE)}>
				Edit Group
				{#if data.role === GROUP_LEAD}
					Name
				{:else}
					Title
				{/if}
			</button>
			<button class="btn primary large" type="button" onclick={() => (mode = DELETE_MODE)}>
				Delete Group
			</button>
		</div>
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
