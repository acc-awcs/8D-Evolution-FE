<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';

	let loading = $state(false);
</script>

<DecorativeBackground opacity={true} />

<h1 class="title">Ready?</h1>
<p>We've found your group.</p>
<p>
	Let your facilitator know you're ready to take the quiz by clicking the "I'm Ready" button below.
</p>

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
	<button class="btn primary medium" type="submit" disabled={loading} class:loading>
		{#if loading}
			<ButtonLoader />
		{:else}
			I'm Ready <span>♥</span>
		{/if}</button
	>
</form>

<style>
	span {
		margin-left: 2px;
	}
	button {
		margin-top: 16px;
	}
</style>
