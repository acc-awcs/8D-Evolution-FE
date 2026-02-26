<script lang="ts">
	import DynamicSlider from '$lib/components/DynamicSlider.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	let innerWidth = $state(500);
	let { data } = $props();
	let highlight = $state(0);
	let chartWidth = $state(500);

	function onHover(select: number) {
		highlight = select;
	}
</script>

<svelte:window bind:innerWidth />

<div class="outer">
	<section>
		<button class="link-like" onclick={() => history.back()}>← Back</button>
	</section>
	<section class="wrapper">
		<div class="intro">
			<!-- <p class="uppercase-title">Ending Point</p> -->
			<h2 class="title">Ending Point “Web”</h2>
			<p>Here's the “web” associated with the following survey response:</p>
			<p class="response">“{data.survey.text}”</p>
			<DynamicSlider
				{highlight}
				answers={data.current?.answers.map((a) => a.value)}
				{onHover}
				onLeave={() => null}
			/>
		</div>
		<div class="chart" aria-hidden="true" bind:clientWidth={chartWidth}>
			<SpiderChart
				answers={data.current?.object}
				{highlight}
				{chartWidth}
				{onHover}
				onLeave={() => null}
				isStart={true}
			/>
		</div>
	</section>
</div>

<style>
	.intro {
		margin: 0px 20px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.chart {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 60px;
	}

	.fade-in {
		transition: all 2s linear;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 2s ease 0s 1 forwards;
	}

	.outer {
		margin-top: 60px;
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

	.response {
		font-style: italic;
	}
	.title {
		text-align: center;
	}

	@media screen and (min-width: 900px) {
		.uppercase-title {
			text-align: left;
		}
		.title {
			text-align: left;
		}
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
	}

	@media screen and (max-width: 400px) {
		.clouds {
			padding: 10px;
			padding-bottom: 20px;
		}
	}
</style>
