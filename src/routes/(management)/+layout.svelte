<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';

	onMount(() => {
		if (browser) {
			document.body.style.backgroundColor = 'var(--periwinkle)';
		}
	});
</script>

<main class="wrapper" class:admin={page.url.pathname?.includes('admin')}>
	<DecorativeBackground />

	<nav>
		<Logo relative={true} />
	</nav>

	<div class="tile">
		<slot />
	</div>

	<div></div>
</main>

<style>
	.wrapper {
		display: flex;
		min-height: 100vh;
		width: 100%;
		padding: 30px 20px;
		box-sizing: border-box;
		background-color: var(--periwinkle);
		justify-content: space-between;
		align-items: center;
		position: relative;
		flex-direction: column;
	}

	.admin.wrapper {
		background-color: var(--cloud);
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

	.admin .tile {
		border: 1px solid var(--onyx);
		box-shadow: none;
	}

	img {
		position: absolute;
		z-index: 0;
	}

	.square {
		z-index: 1;
		bottom: 0px;
		left: 40px;
		width: 235px;
		height: 148px;
	}

	.square-2 {
		right: 0px;
		top: 80px;
		width: 134px;
		height: 230px;
	}

	.arc-side {
		left: 0px;
		top: 80px;
		width: 203px;
		height: 336px;
	}

	.arc-corner {
		bottom: 0px;
		right: 0px;
		width: 235px;
		height: 240px;
	}

	.mag-square {
		bottom: 0px;
		left: 0px;
		width: 228px;
		height: 304px;
	}

	.mag-long {
		right: 0px;
		top: 180px;
		width: 103px;
		height: 322px;
	}

	.square,
	.square-2 {
		opacity: 1;
		transition: opacity 0.2s ease;
	}

	@media screen and (max-width: 800px) {
		.square,
		.square-2 {
			opacity: 0.6;
		}
	}

	@media screen and (max-width: 600px) {
		.arc-corner {
			right: -20px;
		}
		.square {
			left: -80px;
		}
	}
</style>
