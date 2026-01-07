<script>
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	let loading = $state(false);
</script>

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
	<h2 class="title small">Upgrade</h2>
	<p>This action may not be available.</p>
	<div class="buttons">
		<button class="btn primary large" type="submit" disabled={loading} class:loading>
			{#if loading}
				<ButtonLoader />
			{:else}
				Upgrade
			{/if}
		</button>
	</div>
</form>
