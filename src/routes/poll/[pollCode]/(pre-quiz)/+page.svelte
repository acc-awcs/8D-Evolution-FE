<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';

	let { data } = $props();
	let loading = $state(false);
</script>

<h1 class="title">Sweet!</h1>
<p>We've connected to your group.</p>
<p>Let your facilitator know you're ready to take the quiz by clicking the "Ready" button below.</p>

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
	<input type="hidden" name="pollCode" value={data.pollCode} />
	<button class="btn primary medium" type="submit">
		{#if loading}
			<ButtonLoader />
		{:else}
			Ready <span>♥</span>
		{/if}</button
	>
</form>

<style>
	span {
		margin-left: 2px;
	}
</style>
