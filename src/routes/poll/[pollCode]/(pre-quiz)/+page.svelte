<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';
	import Heart from '$lib/components/Heart.svelte';

	let loading = $state(false);
</script>

<DecorativeBackground opacity={true} />

<h1 class="title">Ready?</h1>
<p>We've found your group!</p>
<p>Let everyone know you’re here by clicking this button:</p>

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
	<button class="btn quaternary medium" type="submit" disabled={loading} class:loading>
		{#if loading}
			<ButtonLoader />
		{:else}
			I'm Ready <span><Heart /></span>
		{/if}</button
	>
</form>

<style>
	span {
		margin-left: 3px;
		position: relative;
		top: 2px;
	}
	button {
		margin-top: 16px;
	}
	form {
		max-width: 100%;
		position: relative;
		z-index: 10;
	}
</style>
