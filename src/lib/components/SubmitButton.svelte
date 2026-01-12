<script>
	import ButtonLoader from './ButtonLoader.svelte';
	let { children, loading } = $props();
</script>

<button class="btn primary" type="submit" onclick={() => (loading = true)} class:loading>
	{#if loading}
		<ButtonLoader />
	{:else}
		{@render children()}
	{/if}
</button>
