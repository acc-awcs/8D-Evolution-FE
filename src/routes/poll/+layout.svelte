<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	let { children } = $props();
</script>

<div class="wrapper">
	<header class="logo">
		<Logo />
	</header>
	<main>
		<div class="column">
			{@render children()}
		</div>
	</main>
</div>

<style>
	.logo {
		height: 120px;
		margin-bottom: 40px;
		display: flex;
		justify-content: center;
	}
	.wrapper {
		background-color: var(--cloud);
		box-sizing: border-box;
		padding: 20px 20px;
		max-width: 100%;
	}

	main {
		min-height: 90vh;
		min-height: calc(100vh - 400px);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.column {
		box-sizing: border-box;
		display: flex;
		width: var(--width-medium);
		max-width: 100%;
		justify-content: center;
		text-align: center;
		flex-direction: column;
	}
</style>
