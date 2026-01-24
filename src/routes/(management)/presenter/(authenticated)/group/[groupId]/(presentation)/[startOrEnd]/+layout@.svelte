<script>
	import FullScreen from '$lib/components/FullScreen.svelte';
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { data, children } = $props();
	let isFullScreen = $state(false);
	const onReviewPage = page.url.pathname.includes('review');

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
			<a href={`/presenter/group/${data.groupId}`}>
				{#if onReviewPage}
					Close Review
				{:else}
					End Poll
				{/if}
			</a>
			<FullScreen {isFullScreen} onClick={toggleFullScreen}></FullScreen>
		</nav>

		<main>
			<div class="children">
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
		overflow: visible;
	}

	@media screen and (max-width: 600px) {
		main {
			padding: 20px 20px;
		}
	}
</style>
