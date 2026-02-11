<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';

	let loading = $state(false); // This variable will track the loading state
	let errorMessage = $state(null);
	let adminError = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;

		return async ({ result, update }) => {
			await update();
			errorMessage = result?.data?.success === false ? result?.data?.message : null;
			adminError = result?.data?.success === false ? result?.data?.admin : null;
			loading = false;
		};
	}}
>
	<h1 class="title">Login for Facilitators & Group Leads</h1>
	<p class="intro">Help groups map their Climate Wayfinding progress with the 8 Dynamics.</p>
	<label>
		Email
		<input required class="large" type="email" name="email" />
	</label>
	<label>
		Password
		<input required class="large" type="password" name="password" />
	</label>
	{#if errorMessage}
		<p class="error">
			{errorMessage}
			{#if adminError}
				<a href="/admin/login">Go to admin login</a>
			{/if}
		</p>
	{/if}
	<button class="btn primary large" disabled={loading} class:loading>
		{#if loading}
			<ButtonLoader />
		{:else}
			Submit
		{/if}
	</button>
	<p class="note secondary"><a href="/groups/reset-password">Forgot password</a></p>

	<p class="note">Not signed up yet? <a href="/groups/create">Create an account</a></p>
</form>

<style>
	.title {
		text-align: center;
	}
	label {
		display: block;
		margin-bottom: 24px;
	}
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
	.note.secondary {
		margin-top: 20px;

		font-style: normal;
	}
	.intro {
		text-align: center;
		margin-bottom: 42px;
		padding: 0px 40px;
	}
	@media screen and (max-width: 800px) {
		.intro {
			padding: 0px;
		}
	}
</style>
