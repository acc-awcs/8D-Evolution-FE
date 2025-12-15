<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';

	let loading = $state(false); // This variable will track the loading state
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
	<h1 class="title">Presenter Login</h1>
	<p>
		Help groups visualize their Climate Wayfinding progress through collective 8-Dynamics
		assessments.
	</p>
	<label>
		Email
		<input required class="large" type="email" name="email" />
	</label>
	<label>
		Password
		<input required class="large" type="password" name="password" />
	</label>
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
	<button class="btn primary large" disabled={loading}>
		{#if loading}
			<ButtonLoader />
		{:else}
			Submit
		{/if}
	</button>
	<p class="note">Not signed up yet? <a href="/presenter/create">Create a presenter account</a></p>
</form>

<style>
	.note {
		margin-top: 28px;
		font-size: 14px;
		text-align: center;
		font-style: italic;
		/* margin-bottom: 0px; */
	}
</style>
