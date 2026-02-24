<script lang="ts">
	import DynamicSlider from '$lib/components/DynamicSlider.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { _sendEmail } from './+page';
	import { rotateDynamic } from '$lib/dynamics';
	import { onDestroy, onMount } from 'svelte';
	import cloudBg from '$lib/assets/cloud-bg.jpg';
	import ButtonArrow from '$lib/components/ButtonArrow.svelte';

	const INTERVAL = 1500;
	const BREAKPOINT = 900;
	let innerWidth = $state(500);
	let { data } = $props();
	let highlight = $state(0);
	let intervalId = $state<number>();
	let chartWidth = $state(500);

	function startRotate() {
		if (innerWidth < BREAKPOINT) {
			// If the screen is mobile width, we don't want to automatically highlight the dynamics
			return;
		}
		if (!intervalId) {
			intervalId = setInterval(() => {
				highlight = rotateDynamic(highlight, 1);
			}, INTERVAL);
		}
	}
	function stopRotate() {
		clearInterval(intervalId);
		intervalId = undefined;
	}

	function onHover(select: number) {
		highlight = select;
		stopRotate();
	}

	onMount(() => {
		startRotate();
	});
	onDestroy(() => {
		stopRotate();
	});
</script>

<svelte:window bind:innerWidth />

<div class="outer">
	<img class="cloud-bg static-fade-in" src={cloudBg} alt="" />
	<header class="logo">
		<Logo liveLink={true} />
	</header>
	<main>
		<section class="clouds">
			<div class="intro fade-in">
				<p class="uppercase-title">Ending Point</p>
				<h1 class="title">Here’s your personal 8 Dynamics “web.”</h1>
				<!-- <h1 class="title">Your 8 Dynamics Results</h1> -->
			</div>
			<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={chartWidth}>
				<SpiderChart
					answers={data.current?.object}
					{highlight}
					{chartWidth}
					{onHover}
					onLeave={startRotate}
					isStart={true}
				/>
			</div>
			<div class="results fade-in">
				<DynamicSlider
					{highlight}
					answers={data.current?.answers.map((a) => a.value)}
					{onHover}
					onLeave={startRotate}
				/>
				<p class="fade-in extra-delayed">
					<a class="btn primary" href={`/end/${data.resultCode}`}
						>See What Shifted <ButtonArrow /></a
					>
				</p>
			</div>
		</section>
	</main>
</div>

<style>
	.outer {
		background-color: var(--cloud);
		min-height: 100vh;
		min-height: 100dvh;
		box-sizing: border-box;
		position: relative;
	}
	.cloud-bg {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
	}
	.clouds {
		/* background-color: var(--cloud); */
		position: relative;
		grid-template-columns: 1fr minmax(400px, 1fr);
		grid-template-rows: 1fr 2fr;
		gap: 1em 3em;
		padding: 0px 20px;
		padding-bottom: 40px;
		box-sizing: border-box;
	}
	.logo {
		height: 100px;
		position: relative;
		display: flex;
		justify-content: center;
	}
	.intro {
		margin: 0px 20px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.chart {
		grid-column-start: 2;
		grid-column-end: span 1;
		grid-row-start: 1;
		grid-row-end: span 2;
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h1 {
		margin: 0;
		padding: 0;
		margin-top: 30px;
		margin-bottom: 40px;
	}

	.up-next {
		display: flex;
		justify-content: center;
		background-color: var(--periwinkle);
		padding: 60px 20px;
	}

	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: var(--width-medium);
		text-align: center;
		max-width: 100%;
		margin: 40px 0px;
	}

	.instructions {
		margin: 20px 0px;
	}

	.instructions p {
		font-size: 1rem;
	}

	.up-next .btn {
		margin-bottom: 30px;
	}

	.buttons {
		width: 100%;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.buttons .btn {
		width: 100%;
	}

	.buttons.done .btn {
		margin-top: 10px;
		width: 70%;
	}

	.modal-title {
		margin-bottom: 20px;
	}

	.results {
		margin-top: 30px;
	}

	.fade-in {
		transition: all 2s linear;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 2s ease 0s 1 forwards;
	}

	.delayed {
		animation-delay: 0.5s;
		animation-duration: 3s;
	}

	.extra-delayed {
		margin-top: 40px;
		animation-delay: 1.5s;
		text-align: center;
	}

	.conclusion {
		background-color: var(--soil);
		padding: 40px;
		display: flex;
		justify-content: center;
	}

	.fancy-link {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 26px;
		line-height: 1.4;
		margin: 0;
		color: var(--onyx);
		text-decoration: none;
	}

	.fancy-link:hover {
		text-decoration: underline;
	}

	label > span {
		display: block;
		margin-bottom: 10px;
		font-size: 1rem;
		color: #333;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}

		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	@media screen and (min-width: 900px) {
		.clouds {
			display: grid;
			padding: 20px 60px;
			padding-bottom: 80px;
		}
		h1 {
			margin-bottom: 0px;
		}
		.intro {
			margin: 0px;
		}
		.extra-delayed {
			text-align: left;
		}
	}

	@media screen and (max-width: 400px) {
		.clouds {
			padding: 10px;
			padding-bottom: 20px;
		}
	}
</style>
