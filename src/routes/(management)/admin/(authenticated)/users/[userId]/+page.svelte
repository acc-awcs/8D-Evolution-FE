<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Table from '$lib/components/Table.svelte';
	import { ADMIN, FACILITATOR, GROUP_LEAD, ROLE_PRETTY_NAMES } from '$lib/constants.js';

	let { data } = $props();
	let editMode = $state(false);
	let deleteMode = $state(false);
	let loading = $state(false);

	console.log('DATA', data);
</script>

<br /><br />

<a href="/admin/users">← All Users</a>

<h1 class="title">User Details</h1>

<p>Email: {data.user.email}</p>
<p>Role: {ROLE_PRETTY_NAMES[data.user.role]}</p>
{#if data.user.role === ADMIN}
	<p>Receives New Group Emails: {data.user.receiveNewGroupEmails ? 'Yes' : 'No'}</p>
{/if}
{#if data.user.role !== GROUP_LEAD && data.user.firstName}
	<p>Name: {data.user.firstName} {data.user.lastName}</p>
	<p>Organization: {data.user.organization}</p>
{/if}

{#if editMode}
	<form
		method="POST"
		action="?/edit"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				editMode = false;
				loading = false;
			};
		}}
	>
		<h2 class="title small">Edit User</h2>
		<input type="hidden" name="userId" value={data.user?._id} />
		{#if data.user?.role === ADMIN}
			<label>
				Receives New Group Emails
				<select
					required
					name="receiveNewGroupEmails"
					value={data.user?.receiveNewGroupEmails ? 'true' : 'false'}
				>
					<option value="true">Yes</option>
					<option value="false">No</option>
				</select>
			</label>
		{/if}
		<label>
			Role
			<select required name="role" value={data.user?.role}>
				<option value={GROUP_LEAD}>Group Lead</option>
				<option value={FACILITATOR}>Trained Facilitator</option>
				<option value={ADMIN}>Admin</option>
			</select>
		</label>
		<div class="buttons">
			<button class="btn secondary large" type="button" onclick={() => (editMode = false)}>
				Cancel
			</button>
			<button class="btn primary large" type="submit" disabled={loading} class:loading>
				{#if loading}
					<ButtonLoader />
				{:else}
					Save
				{/if}
			</button>
		</div>
	</form>
{:else if deleteMode}
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
		<h1 class="title small">Delete User</h1>
		<p>
			Are you sure you want to delete this user? Any groups they’ve made won’t be deleted, but this
			user won’t be able to log in anymore. If they recreate an account, their old groups will no
			longer be available to them.
		</p>
		<p>Account deletion does not automatically notify the user.</p>
		<input type="hidden" name="userId" value={data.user?._id} />
		<div class="buttons">
			<button class="btn secondary large" type="button" onclick={() => (deleteMode = false)}>
				Cancel
			</button>
			<button class="btn primary large" type="submit" disabled={loading} class:loading>
				{#if loading}
					<ButtonLoader />
				{:else}
					Delete
				{/if}
			</button>
		</div>
	</form>
{:else}
	<button class="btn primary" onclick={() => (editMode = true)}>Edit User</button>
	<button class="btn secondary" onclick={() => (deleteMode = true)}>Delete User</button>
{/if}

{#if data.user.role !== ADMIN}
	<h2 class="title" style="margin-top: 50px;">Groups</h2>
	{#if data.groups?.length > 0}
		<Table
			header={['Group Name', 'Facilitator', 'Start Poll Date', 'End Poll Date']}
			rowLinks={data.groups.map((group) => `/admin/facilitation/${group._id}`)}
			rows={data.groups.map((group) => [
				group.name,
				group.creatorShortName,
				group.startPollDate
					? new Date(group.startPollDate).toLocaleString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})
					: 'N/A',
				group.endPollDate
					? new Date(group.endPollDate).toLocaleString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})
					: 'N/A'
			])}
		/>
	{:else}
		<p>This user hasn’t created any groups yet.</p>
	{/if}
{/if}

<style>
	form {
		width: 500px;
		max-width: 100%;
		padding: 20px;
		box-sizing: border-box;
		padding-top: 10px;
		background-color: var(--cloud-dark);
		border-radius: var(--br);
	}
	.buttons {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.buttons button {
		flex: 1;
	}
</style>
