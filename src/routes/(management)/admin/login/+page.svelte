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
	<h1 class="title">Admin Login</h1>
	<!-- <p>Review 8 Dynamics collective responses across all groups and facilitations.</p> -->
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
	<button class="btn primary large" disabled={loading} class:loading>
		{#if loading}
			<ButtonLoader />
		{:else}
			Submit
		{/if}
	</button>
	<p class="note secondary"><a href="/admin/reset-password">Forgot password</a></p>
</form>

<style>
	.note {
		margin-top: 0px;
		font-size: 14px;
		text-align: center;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.note.secondary {
		margin-top: 28px;

		font-style: normal;
	}
</style>
