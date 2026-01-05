<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
</script>

<main class="wrapper">
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

	nav {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	.tile {
		padding: 28px;
		background-color: var(--cloud);
		border-radius: var(--br);
		width: var(--width-extra-small);
		max-width: 100%;
		box-sizing: border-box;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
	}
</style>
