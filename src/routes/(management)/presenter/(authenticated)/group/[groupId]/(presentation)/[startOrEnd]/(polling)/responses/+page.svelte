<script>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { shortenUrl } from '$lib/helpers/general';
	import { onDestroy } from 'svelte';
	import SingleChartDisplay from '../../SingleChartDisplay.svelte';

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
</script>

<div class="join-note">
	Still need to join? Visit <strong>{shortenUrl(PUBLIC_BASE_URL)}/poll</strong> and use code
	<strong class="spaced">{data.isStart ? data.group.startPollCode : data.group.endPollCode}</strong>
</div>
<h1 class="title">Our Collective {data.isStart ? 'Starting' : 'Ending'} Point</h1>

<SingleChartDisplay results={data.matchingResults} />

<PresentationFooter
	num={data.matchingResults.length}
	numLabel="Responses"
	helper={`Currently, ${data.matchingResults.length} response${data.matchingResults.length !== 1 ? 's are' : ' is'} in.\nThis chart updates as responses are submitted.`}
	onPrev={() => goto(`/presenter/group/${data.group._id}/${data.startOrEnd}`)}
	nextLabel={data.isStart ? 'End Poll' : 'View Shift'}
	onNext={data.isStart
		? () => goto(`/presenter/group/${data.group._id}`)
		: () => goto(`/presenter/group/${data.group._id}/end/comparison`)}
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
