<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';

	onMount(() => {
		if (browser) {
			if (page.url.pathname?.includes('admin')) {
				document.body.style.backgroundColor = 'var(--cloud)';
			} else {
				document.body.style.backgroundColor = 'var(--periwinkle)';
			}
		}
	});
</script>

<main class="wrapper" class:admin={page.url.pathname?.includes('admin')}>
	<DecorativeBackground opacity={true} />

	<nav>
		<Logo relative={true} liveLink={true} />
	</nav>

	<div class="tile-wrapper">
		<div class="tile">
			<slot />
		</div>
	</div>
</main>

<style>
	.wrapper {
		display: flex;
		min-height: 100vh;
		min-height: 100dvh;
		width: 100%;
		padding: 30px 20px;
		box-sizing: border-box;
		background-color: var(--periwinkle);
		/* justify-content: space-between; */
		align-items: center;
		position: relative;
		flex-direction: column;
	}

	.admin.wrapper {
		background-color: var(--soil);
	}

	nav {
		/* position: absolute; */
		/* top: 0px;
		left: 0px; */
		z-index: 10;
		width: 100%;
		padding: 0px 20px;
		margin-bottom: 30px;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
	}

	.tile {
		padding: 24px 50px;
		background-color: var(--cloud);
		border-radius: var(--br);
		width: var(--width-extra-small);
		max-width: 100%;
		box-sizing: border-box;
		/* box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1); */
		z-index: 11;
		margin-bottom: 30px;
		position: relative;
	}

	.tile-wrapper {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100%;
	}

	@media screen and (max-width: 600px) {
		.tile {
			padding: 24px 26px;
		}
	}
</style>
