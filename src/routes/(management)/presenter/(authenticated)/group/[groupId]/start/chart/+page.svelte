<script>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { shortenUrl } from '$lib/helpers/general';
	import { formatAnswers } from '$lib/helpers/results';
	import { onDestroy } from 'svelte';

	let chartWidth = $state(450);

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

	let { data } = $props();

	const answers = $derived(
		data.matchingResults?.length > 0 ? formatAnswers(data.matchingResults) : null
	);
</script>

<div class="join-note">
	Still need to join? Visit <strong>{shortenUrl(PUBLIC_BASE_URL)}/poll</strong> and use code
	<strong class="spaced">{data.group.startPollCode}</strong>
</div>
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
			<p>Waiting for results to come in ...</p>
		{/if}
	</div>
</div>

<PresentationFooter
	num={data.matchingResults.length}
	numLabel="Responses"
	onNext={null}
	onPrev={() => goto(`/presenter/group/${data.group._id}/start`)}
/>

<style>
	.join-note {
		text-align: center;
		position: relative;
		top: -10px;
		margin-top: -20px;
	}
	.join-note strong {
		background-color: var(--cloud-dark);
		padding: 6px 6px;
		padding-bottom: 4px;
		border-radius: 4px;
		letter-spacing: 0.5px;
	}
	.spaced {
		letter-spacing: 1px;
	}
	.title {
		text-align: center;
		margin-top: 10px;
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

	.chart-wrapper {
		display: flex;
		justify-content: center;
		max-width: 100%;
	}
</style>
