<script>
	import { browser } from '$app/environment';
	import ButtonArrow from '$lib/components/ButtonArrow.svelte';
	import DecorativeBackground from '$lib/components/DecorativeBackground.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			document.body.style.backgroundColor = 'var(--periwinkle)';
		}
	});
</script>

<div class="backdrop"></div>

<DecorativeBackground opacity={true} />

<div class="logo-wrapper">
	<Logo liveLink={true} relative={true} />
</div>

<main>
	<section>
		<h1 class="title large">Welcome, Climate Wayfinder</h1>
		<p>
			Are you a Climate Wayfinding reader? You've made it to the right place to reflect with the 8
			Dynamics of Climate Engagement quiz.
		</p>

		<div class="links">
			<a href="/start" class="btn primary">Take the Starting Point Quiz <ButtonArrow /></a>
			<a href="/end" class="btn primary">Take the Ending Point Quiz <ButtonArrow /></a>
		</div>
	</section>
</main>

<style>
	.backdrop {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: var(--periwinkle);
		top: 0px;
		left: 0px;
	}
	.logo-wrapper {
		/* position: sticky;
		top: 0px;
		left: 0px; */
		padding: 20px 0px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	main {
		z-index: 10;
		padding: 3rem;
		padding-top: 1rem;
		min-height: calc(100vh - 80px);
		position: relative;
		box-sizing: border-box;
		grid-template-columns: 1fr minmax(400px, 1fr);
		grid-template-rows: min-content 1fr;
		gap: 1em 3em;
		/* background-image:
			url('$lib/assets/cloud-1.png'), url('$lib/assets/cloud-4.png'), url('$lib/assets/cloud-5.png');
		background-repeat: no-repeat, no-repeat, no-repeat;
		background-blend-mode: overlay, overlay, overlay;
		background-position:
			bottom left,
			bottom 0 right -100px,
			bottom right;
		background-size: 485px, 504px, 503px; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		max-width: 100%;
	}

	.title {
		text-align: center;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 100%;
	}

	p {
		margin-top: 20px;
		margin-bottom: 40px;
		font-size: 20px;
		line-height: 160%;
		text-align: center;
		width: 670px;
		max-width: 100%;
		/* font-weight: 600; */
	}

	h1 {
		font-size: 72px;
		margin-top: 0px;
		margin-bottom: 25px;
	}

	.links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	@media screen and (max-width: 600px) {
		.links {
			flex-direction: column;
		}
		section {
			padding-top: 30px;
		}
		.logo-wrapper {
			display: flex;
			justify-content: center;
			width: 100%;
		}
		main {
			padding: 20px;
			padding-bottom: 40px;
		}
	}

	@media screen and (max-width: 400px) {
		main,
		.logo-wrapper {
			background-color: #a2b5fc7e;
		}
	}
</style>
