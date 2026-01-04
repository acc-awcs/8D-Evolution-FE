<script>
	import FullScreen from '$lib/components/FullScreen.svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let isFullScreen = $state(false);
	const onReviewPage = page.url.pathname.includes('review');

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

	function reloadPage() {
		if (browser) {
			location.reload();
		}
	}
</script>

<div class="wrapper">
	<nav>
		<a href={`/presenter/group`}>
			{#if onReviewPage}
				Close Review
			{:else}
				Back to Groups
			{/if}
		</a>
		<FullScreen {isFullScreen} onClick={toggleFullScreen}></FullScreen>
	</nav>

	<main>
		<div class="children">
			<h1 class="title">One moment! ...</h1>

			<p>We've had trouble connecting, please try refreshing this page.</p>

			<button class="btn primary" onclick={reloadPage}>Refresh</button>
		</div>
	</main>
</div>

<style>
	.wrapper {
		background-color: var(--cloud);
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: space-around;
		justify-content: center;
		position: relative;
	}

	nav {
		position: fixed;
		width: 100%;
		top: 0px;
		left: 0px;
		display: flex;
		justify-content: space-between;
		padding: 16px;
		align-items: flex-start;
		box-sizing: border-box;
	}

	main {
		width: 1200px;
		max-width: 100%;
		align-self: center;
		padding: 0px 40px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.children {
		flex: 1;
		max-height: 80vh;
		overflow: visible;
	}

	@media screen and (max-width: 600px) {
		main {
			padding: 20px 20px;
		}
	}
</style>
