<script>
	import Logo from '$lib/components/Logo.svelte';
	import accountIcon from '$lib/assets/account.svg';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';
	import { GROUP_LEAD } from '$lib/constants.js';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import { onMount } from 'svelte';
	import FullScreen from '$lib/components/FullScreen.svelte';
	import { browser } from '$app/environment';

	let { data, children } = $props();
	let isFullScreen = $state(false);

	const checkFullScreen = () => {
		if (browser && document.fullscreenElement) {
			return true;
		}
		return false;
	};

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

<div class="wrapper">
	<nav>
		<a href={`/presenter/group/${data.groupId}`}> Exit </a>
		<FullScreen {isFullScreen} onClick={toggleFullScreen}></FullScreen>
	</nav>

	<main>
		<div class="children">
			{@render children()}
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
		position: absolute;
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
	}

	@media screen and (max-width: 600px) {
		main {
			padding: 20px 20px;
		}
	}
</style>
