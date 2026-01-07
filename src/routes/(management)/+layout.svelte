<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';
</script>

<main class="wrapper" class:admin={page.url.pathname?.includes('admin')}>
	<nav>
		<Logo relative={true} />
	</nav>

	<div class="tile">
		<slot />
	</div>
</main>

<style>
	.wrapper {
		display: flex;
		min-height: 100vh;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		background-color: var(--periwinkle);
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.admin.wrapper {
		background-color: var(--cloud);
	}

	nav {
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 0;
		width: 100%;
		padding: 20px;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
	}

	.tile {
		padding: 28px;
		background-color: var(--cloud);
		border-radius: var(--br);
		width: var(--width-extra-small);
		max-width: 100%;
		box-sizing: border-box;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
		z-index: 1;
		position: relative;
	}

	.admin .tile {
		border: 1px solid var(--onyx);
		box-shadow: none;
	}
</style>
