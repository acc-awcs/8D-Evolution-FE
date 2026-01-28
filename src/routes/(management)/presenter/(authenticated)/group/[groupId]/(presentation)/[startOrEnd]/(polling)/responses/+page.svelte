<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import PresentationFooter from '$lib/components/PresentationFooter.svelte';
	import { shortenUrl } from '$lib/helpers/general';
	import { onMount } from 'svelte';
	import SingleChartDisplay from '../../SingleChartDisplay.svelte';
	import QRCodeModal from './QRCodeModal.svelte';
	import { FACILITATOR, POLLING_COUNT_MAX } from '$lib/constants';
	import StillPollingModal from '../StillPollingModal.svelte';

	let showModal = $state(false);
	let { data: loadData } = $props();
	let intervalId = $state(null);

	const startOrEnd = loadData?.startOrEnd;
	const groupId = loadData?.groupId;
	const isStart = loadData?.isStart;
	const role = loadData?.role;

	let data = $state(loadData);
	let intervalCount = $state(0);
	let showContinuePrompt = $state(false);

	async function fetchData() {
		if (intervalCount < POLLING_COUNT_MAX) {
			try {
				const response = await fetch(`/api/poll/${groupId}/${startOrEnd}`);
				if (response.ok) {
					const result = await response.json();
					data = result.data;
				} else {
					console.error('Failed to fetch data');
				}
			} catch (error) {
				console.error('Error during fetch:', error);
			}
			intervalCount += 1;
		} else {
			if (!showContinuePrompt) {
				showContinuePrompt = true;
			}
		}
	}

	// Start polling
	onMount(() => {
		fetchData();
		intervalId = setInterval(fetchData, 5000);
		return () => clearInterval(intervalId);
	});

	const pollCode = $derived(isStart ? data.group?.startPollCode : data.group?.endPollCode);
</script>

{#if showModal}
	<QRCodeModal onClose={() => (showModal = false)} {pollCode} />
{/if}

{#if showContinuePrompt}
	<StillPollingModal
		onClose={() => {
			intervalCount = 0;
			showContinuePrompt = false;
		}}
		{pollCode}
	/>
{/if}

<div class="join-note">
	<strong>Still need to join?</strong> Go to <strong>{shortenUrl(PUBLIC_BASE_URL)}/poll</strong> and
	enter
	<strong class="spaced"
		><span>{pollCode?.slice(0, 3)}</span><span>{pollCode?.slice(3, 6)}</span></strong
	>.
	<button class="link-like" onclick={() => (showModal = true)}>Show QR</button>
</div>

<SingleChartDisplay results={data.matchingResults} />

<PresentationFooter
	num={data?.matchingResults.length || 0}
	numLabel="Responses"
	role={role || FACILITATOR}
	helper={`Currently, ${data?.matchingResults.length || 0} response${data?.matchingResults.length !== 1 ? 's are' : ' is'} in. This chart updates as responses are submitted.`}
	onPrev={() => (data?.group ? goto(`/presenter/group/${groupId}/${startOrEnd}`) : null)}
	nextLabel={isStart ? 'End Poll' : 'View Shift'}
	onNext={isStart
		? () => goto(`/presenter/group/${groupId}`)
		: () => goto(`/presenter/group/${groupId}/end/comparison`)}
/>

<style>
	.join-note {
		text-align: center;
		position: relative;
		top: -10px;
		margin-top: 0px;
		margin-bottom: 30px;
	}
	.join-note strong {
		/* background-color: var(--cloud-dark);
		padding: 6px 6px;
		padding-bottom: 4px;
		border-radius: 4px;
		letter-spacing: 0.5px; */
	}
	.spaced {
		/* letter-spacing: 1px; */
	}
	.spaced span {
		margin: 0px 2px;
	}
	.link-like {
		color: var(--periwinkle-darker);
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
