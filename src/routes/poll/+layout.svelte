<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';
	import Logo from '$lib/components/Logo.svelte';
	let { children } = $props();
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	const queryClient = new QueryClient();

	let bgColor = $state('var(--periwinkle)');

	if (page.url.pathname.includes('post-quiz')) {
		bgColor = 'var(--soil)';
	}

	onMount(() => {
		if (browser) {
			document.body.style.backgroundColor = bgColor;
		}
	});
</script>

{#if page.url.pathname === '/poll'}
	<DecorativeBackground />
{/if}

<QueryClientProvider client={queryClient}>
	<div class="wrapper" style={`background-color: ${bgColor};`}>
		<header class="logo">
			<Logo relative={true} />
			{#if page.url.pathname.includes('ready')}
				<p>Group</p>
				<p class="code">
					<span>{page.params.pollCode?.slice(0, 3)}</span><span
						>{page.params.pollCode?.slice(3, 6)}</span
					>
				</p>
			{/if}
		</header>
		<main>
			<div class="column">
				{@render children()}
			</div>
		</main>
		<div
			class="offset"
			style={`height: ${page.url.pathname.includes('ready') ? '180px' : '20px'};`}
		></div>
	</div>
</QueryClientProvider>

<style>
	.offset {
		width: 100%;
		height: 100px;
	}
	.logo {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.wrapper {
		background-color: var(--periwinkle);
		box-sizing: border-box;
		padding: 20px 20px;
		max-width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	main {
		/* height: 90vh;
		height: calc(100vh - 350px); */
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100%;
	}

	.column {
		position: relative;
		display: flex;
		width: 500px;
		max-width: 100%;
		justify-content: center;
		text-align: center;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}

	p {
		padding-top: 30px;
		margin: 6px;
	}

	.code {
		margin: 0px;
		font-weight: 700;
		font-size: 20px;
		background-color: var(--neon);
		padding: 6px 10px;
		padding-bottom: 3px;
		border-radius: var(--br);
		letter-spacing: 1px;
	}
	.code span {
		padding: 0px 3px;
	}
</style>
