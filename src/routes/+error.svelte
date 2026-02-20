<script>
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';

	const onPresenterUrl = $derived(page.url.pathname.includes('presenter'));

	function reloadPage() {
		if (browser) {
			location.reload();
		}
	}
</script>

<main>
	<div class="logo-wrapper">
		<Logo liveLink={true} />
	</div>
	<section>
		{#if page.status === 404}
			{#if onPresenterUrl}
				<h1 class="title">We’ve Switched Things Up</h1>
				<p>
					Hi, it looks like you’re looking for a "/presenter" page - we’ve moved these pages to
					"/groups"!
				</p>
				<a class="btn quaternary" href="/groups">Go to Groups</a>
			{:else}
				<h1 class="title">404</h1>
				<p>The requested page could not be found.</p>
			{/if}
		{:else}
			<h1 class="title">Oops!</h1>
			<p>Something went wrong. Let's try that again.</p>
			<button class="btn secondary" onclick={reloadPage}>Refresh</button>
		{/if}
	</section>
</main>

<style>
	.logo-wrapper {
		position: absolute;
		top: 0px;
		left: 0px;
	}
	main {
		background-color: var(--periwinkle);
		padding: 3rem;
		height: 100vh;
		height: 100dvh;
		position: relative;
		box-sizing: border-box;
		grid-template-columns: 1fr minmax(400px, 1fr);
		grid-template-rows: min-content 1fr;
		gap: 1em 3em;
		background-image:
			url('$lib/assets/cloud-1.png'), url('$lib/assets/cloud-4.png'), url('$lib/assets/cloud-5.png');
		background-repeat: no-repeat, no-repeat, no-repeat;
		background-blend-mode: overlay, overlay, overlay;
		background-position:
			bottom left,
			bottom 0 right -100px,
			bottom right;
		background-size: 485px, 504px, 503px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	p {
		margin-top: 0px;
		margin-bottom: 40px;
	}

	h1 {
		font-size: 72px;
		margin-top: 0px;
		margin-bottom: 25px;
	}
</style>
