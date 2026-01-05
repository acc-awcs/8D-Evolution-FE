<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import { ADMIN } from '$lib/constants';

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
	<h1 class="title">Forgot Password</h1>
	<p>If you have an account, we'll send you an email to reset your password.</p>
	<label>
		Email
		<input required class="large" type="email" name="email" />
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
	{#if $page.params.role === ADMIN}
		<p class="note"><a href="/admin/login">Back to Login</a></p>
	{:else}
		<p class="note"><a href="/presenter/login">Back to Login</a></p>
		<p class="note short">
			Not signed up yet? <a href="/presenter/create">Create a presenter account</a>
		</p>
	{/if}
</form>

<style>
	.note {
		margin-top: 28px;
		font-size: 14px;
		text-align: center;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.short {
		margin-top: 12px;
	}
</style>
