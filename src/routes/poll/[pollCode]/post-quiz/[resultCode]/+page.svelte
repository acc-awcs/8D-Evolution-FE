<script>
	import { enhance } from '$app/forms';
	import glyph from '$lib/assets/wayfinding/blank-glyph.png';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import waves from '$lib/assets/wayfinding/waves.png';

	let chartWidth = $state(500);
	let { data } = $props();
	let loading = $state(false);
	let submitted = $state(false);
</script>

<div class="wrapper">
	<img src={glyph} alt="" />

	<h1 class="title">Your 8 Dynamics Web</h1>
	<!-- <Spi -->

	<div class="chart chart-fade-in" aria-hidden="true" bind:clientWidth={chartWidth}>
		<SpiderChart answers={data.current?.object} {chartWidth} isStart={true} />
	</div>

	<div class="chart-fade-in">
		<p>Here's the 8 Dynamics web from your individual submission.</p>

		{#if !data?.showEndingSurvey}
			<p>
				Shift your attention to the presentation to see the averaged results for your group come in.
			</p>
		{/if}
	</div>
</div>

{#if data?.showEndingSurvey}
	<div class="survey" class:complete={submitted}>
		<h2 class="title small">Closing Survey</h2>
		{#if !submitted}
			<form
				method="POST"
				action="?/survey"
				use:enhance={() => {
					loading = true;
					return async ({ update, result }) => {
						await update();
						loading = false;
						if (result?.type === 'success') {
							submitted = true;
						}
					};
				}}
			>
				<label>
					<span>What did you gain from participating in this experience?</span>
					<textarea required class="large" type="password" name="text"></textarea>
				</label>
				<button class="btn quaternary small" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Submit
					{/if}
				</button>
			</form>
		{:else}
			<img class="waves chart-fade-in" src={waves} alt="" />
			<p class="tall chart-fade-in">Thank you!</p>
			<!-- <p class="tall">We've recorded your response.</p> -->
		{/if}
	</div>
{/if}

<style>
	img {
		margin-top: 12px;
		width: 91px;
		height: 91px;
	}
	h1 {
		margin: 40px 0px;
	}
	p {
		margin: 0px;
		margin-bottom: 12px;
	}
	.survey,
	.wrapper {
		max-width: 100%;
		margin: 60px 0px;
	}
	textarea {
		border-radius: var(--br) var(--br) 0px var(--br);
		height: 100px;
	}
	label span {
		display: block;
		font-size: 16px;
		margin-bottom: 30px;
		line-height: 140%;
	}

	.survey {
		background-color: var(--periwinkle);
		padding: 40px;
		border-radius: var(--br);
		width: 800px;
		max-width: 800px;
		box-sizing: border-box;
		margin-top: 0px;
		position: relative;
		overflow: hidden;
	}

	.survey.complete {
		background-color: var(--cloud);
	}

	textarea {
		width: 100%;
		margin-bottom: 30px;
	}

	.survey h2 {
		margin-top: 0px;
	}

	.waves {
		margin-top: 10px;
		margin-bottom: 20px;
		width: calc(205px * 0.8);
		height: calc(185px * 0.8);
	}

	.waves {
		position: absolute;
		bottom: -20px;
		left: -20px;
	}

	/* .intro, */
	.tall {
		margin: 80px 0px;
		position: relative;
		background-color: var(--cloud-faded);
		border-radius: var(--br);
	}

	@media screen and (max-width: 800px) {
		.tall {
			margin-top: 80px;
		}
		.tall {
			margin-bottom: 110px;
		}
		.survey {
			max-width: 100%;
			padding: 30px 20px;
		}
		textarea {
			height: 200px;
		}
	}
</style>
