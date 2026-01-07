<script>
	import ButtonLoader from './ButtonLoader.svelte';

	let { children, href } = $props();

	let loading = $state(false);
</script>

<a class="btn primary" {href} onclick={() => (loading = true)}>
	{#if loading}
		<ButtonLoader />
	{:else}
		{@render children()}
	{/if}
</a>
