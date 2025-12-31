<script>
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { formatAnswers } from '$lib/helpers/results';

	let chartWidth = $state(450);
	let { data } = $props();

	const answers = $derived(
		data.matchingResults?.length > 0 ? formatAnswers(data.matchingResults) : null
	);
</script>

<h1 class="title">Our Collective Starting Point</h1>

<div class="chart-wrapper fade-in">
	<div class="chart" aria-hidden="true" bind:clientWidth={chartWidth}>
		{#if answers}
			<div class="fade-in">
				<SpiderChart
					{answers}
					{chartWidth}
					onHover={() => null}
					onLeave={() => null}
					highlight={12}
					isCollectivePoll={true}
				/>
			</div>
		{:else}
			<p>Looks like there are no results to show.</p>
		{/if}
	</div>
	<p class="fade-in">
		Results from {data.matchingResults?.length} response{data.matchingResults?.length === 1
			? ''
			: 's'} on {new Date(data.group.startPollDate).toLocaleString('en-US', {
			// weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})}
	</p>
</div>

<style>
	.title {
		text-align: center;
		margin-top: 0px;
	}

	.chart {
		max-width: 100%;
		width: 550px;
		height: 550px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chart p {
		margin-top: 0px;
		margin-bottom: 30px;
	}

	.chart-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		flex-direction: column;
		gap: 10px;
	}

	.chart-wrapper > p {
		margin-bottom: 0px;
	}

	.fade-in {
		transition: all 2s linear;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 2s ease 0s 1 forwards;
		animation-delay: 0.2s;
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
</style>
