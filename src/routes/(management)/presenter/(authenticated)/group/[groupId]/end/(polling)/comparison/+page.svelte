<script>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { formatAnswers } from '$lib/helpers/results';
	import { onDestroy } from 'svelte';

	// Only run this on the client side
	if (browser) {
		const interval = setInterval(() => {
			console.log('Polling for new data...');
			invalidateAll();
		}, 3000); // Polls every 3 seconds

		// Clean up the interval when the component is destroyed
		onDestroy(() => {
			clearInterval(interval);
		});
	}

	let startChartWidth = $state(450);
	let endChartWidth = $state(450);
	let { data } = $props();

	const startAnswers = $derived(
		data.startMatchingResults?.length > 0 ? formatAnswers(data.startMatchingResults) : null
	);

	const endAnswers = $derived(
		data.matchingResults?.length > 0 ? formatAnswers(data.matchingResults) : null
	);
</script>

<h1 class="title">Our Collective Shift</h1>

<div class="chart-wrapper">
	{#if startAnswers && endAnswers}
		<div class="chart fade-in" aria-hidden="true" bind:clientWidth={startChartWidth}>
			<h2>Start</h2>
			<SpiderChart
				answers={startAnswers}
				chartWidth={startChartWidth}
				onHover={() => null}
				onLeave={() => null}
				highlight={12}
				isCollectivePoll={true}
				isStart={true}
			/>
			<p>
				Results from {data.matchingResults?.length} response{data.matchingResults?.length === 1
					? ''
					: 's'} on {new Date(data.group.endPollDate).toLocaleString('en-US', {
					// weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		</div>
		<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={endChartWidth}>
			<h2>End</h2>

			<SpiderChart
				answers={endAnswers}
				chartWidth={endChartWidth}
				onHover={() => null}
				onLeave={() => null}
				highlight={12}
				isCollectivePoll={true}
			/>
			<p>
				Results from {data.matchingResults?.length} response{data.matchingResults?.length === 1
					? ''
					: 's'} on {new Date(data.group.endPollDate).toLocaleString('en-US', {
					// weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		</div>
	{/if}
</div>

<PresentationFooter
	num={null}
	numLabel={null}
	onNext={null}
	onPrev={() => goto(`/presenter/group/${data.group._id}/end/chart`)}
/>

<style>
	.title {
		text-align: center;
		margin-top: 0px;
	}

	.chart {
		max-width: 100%;
		width: 450px;
		/* height: 550px; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.chart p {
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 15px;
	}

	.chart-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		gap: 80px;
	}

	.fade-in {
		transition: all 2s linear;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 2s ease 0s 1 forwards;
		animation-delay: 0.2s;
	}

	.delayed {
		animation-delay: 1.5s;
	}

	h2 {
		font-family: 'Instrument Serif', serif;
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
