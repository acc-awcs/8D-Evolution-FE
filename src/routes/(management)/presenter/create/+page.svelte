<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import { FACILITATOR, GROUP_LEAD } from '$lib/constants';

	let loading = $state(false); // This variable will track the loading state
	let accountType = $state('');
	let errorMessage = $state(null);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ result, update }) => {
			await update();
			errorMessage = result?.data?.success === false ? result?.data?.message : null;
			loading = false;
		};
	}}
>
	<h1 class="title">Create Presenter Account</h1>
	<p>
		Help groups visualize their Climate Wayfinding progress through collective 8-Dynamics
		assessments.
	</p>
	<div class="input-row">
		<label>
			Email
			<input required class="large" type="email" name="email" />
		</label>
		<label>
			Password
			<input required class="large" type="password" name="password" />
		</label>
	</div>
	<label>
		Are you a Trained Facilitator or a Group Lead?
		<select required name="accountType" bind:value={accountType}>
			<option value={''}>Select one </option>
			<option value={FACILITATOR}>Trained Facilitator </option>
			<option value={GROUP_LEAD}>Group Lead </option>
		</select>
	</label>
	{#if accountType === FACILITATOR}
		<div class="input-row">
			<label>
				First name
				<input class="large" type="text" name="firstName" />
			</label>
			<label>
				Last name
				<input class="large" type="text" name="lastName" />
			</label>
		</div>
		<label>
			Organization (if applicable)
			<input class="large" type="text" name="organization" />
		</label>
	{/if}
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
	<button class="btn primary large" disabled={loading} class:loading>
		{#if loading}
			<ButtonLoader />
		{:else}
			Submit
		{/if}
	</button>
	<p class="note">Already have an account? <a href="/presenter/login">Go to login</a></p>
</form>

<style>
	.note {
		margin-top: 28px;
		font-size: 14px;
		text-align: center;
		display: flex;
		justify-content: center;
		gap: 6px;
		flex-wrap: wrap;
	}

	.input-row {
		display: flex;
		gap: 16px;
		margin: -20px 0px;
	}

	.input-row label {
		flex: 1;
	}
</style>
