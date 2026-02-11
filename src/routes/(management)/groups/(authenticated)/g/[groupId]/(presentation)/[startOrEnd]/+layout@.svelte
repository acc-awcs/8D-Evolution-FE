<script>
	import FullScreen from '$lib/components/FullScreen.svelte';
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { data, children } = $props();
	let isFullScreen = $state(false);
	const comparison = $derived(
		page.url.pathname.includes('comparison') || page.url.pathname.includes('review/shift')
	);

	onMount(() => {
		if (browser) {
			document.body.style.backgroundColor = 'var(--periwinkle)';
		}
	});

	const toggleFullScreen = () => {
		if (document.fullscreenElement) {
			// If already in fullscreen, exit
			document.exitFullscreen();
			isFullScreen = false;
		} else {
			// If not in fullscreen, request it for the full page
			document.documentElement.requestFullscreen();
			isFullScreen = true;
		}
	};
</script>

<div class="outer-wrapper">
	<div class="wrapper">
		<div class="logo-wrapper">
			<Logo />
		</div>
		<nav>
			<a href={`/groups/g/${data.groupId}`}> Close </a>
			<FullScreen {isFullScreen} onClick={toggleFullScreen}></FullScreen>
		</nav>

		<main>
			<div class="children" class:comparison>
				{@render children()}
			</div>
		</main>
	</div>
</div>

<style>
	.logo-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		position: absolute;
		padding-top: 6px;
		top: 0px;
		left: 0px;
	}
	.outer-wrapper {
		padding: 20px;
		min-height: 100vh;
		min-height: 100dvh;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--periwinkle);
		display: flex;
		flex-direction: column;
	}
	.wrapper {
		background-color: var(--cloud);
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: space-around;
		justify-content: center;
		position: relative;
		border-radius: var(--br);
	}

	nav {
		position: fixed;
		width: 100%;
		top: 20px;
		left: 0px;
		display: flex;
		justify-content: space-between;
		padding: 16px 40px;
		align-items: flex-start;
		box-sizing: border-box;
	}

	main {
		width: 1200px;
		max-width: 100%;
		align-self: center;
		height: 100vh;
		height: calc(100vh - 40px);
		height: calc(100dvh - 40px);
		padding: 0px 40px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		/* overflow: hidden; */
	}

	.children {
		flex: 1;
		max-height: 100vh;
		max-height: 100dvh;
		min-height: 100%;
		overflow: visible;
		padding: 120px 20px;
		/* padding-top: 160px; */
		position: relative;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		/* align-items: center; */
		justify-content: center;
		width: 100%;
	}

	.children.comparison {
		justify-content: flex-start;
		padding-top: 0px;
	}

	@media screen and (max-width: 600px) {
		main {
			padding: 20px 20px;
		}
	}
</style>
