<script>
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
	<h1 class="title">Reset Password</h1>
	<p>Create a new password for your account.</p>
	<label>
		New password
		<input required class="large" type="password" name="password" />
	</label>
	<label>
		Confirm new password
		<input required class="large" type="password" name="confirmPassword" />
	</label>
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
</form>

<style>
	form {
		margin-bottom: 20px;
	}
</style>
