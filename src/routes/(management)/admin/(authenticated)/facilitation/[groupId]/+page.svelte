<script>
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';
	import { formatAnswers, formatManualAnswers } from '$lib/helpers/results';
	import DeleteGroupModal from './DeleteGroupModal.svelte';
	import cloudBg from '$lib/assets/cloud-bg.jpg';

	let { data } = $props();

	let showDeleteModal = $state(false);

	const group = $derived(data.stats?.group);
	const startResults = $derived(data.stats?.startResults);
	const endResults = $derived(data.stats?.endResults);
	const startAnswers = $derived(
		group.manualEntry && group.startPollDate
			? formatManualAnswers(group.manualStartData)
			: startResults?.length > 0
				? formatAnswers(startResults)
				: null
	);
	const endAnswers = $derived(
		group.manualEntry && group.endPollDate
			? formatManualAnswers(group.manualEndData)
			: endResults?.length > 0
				? formatAnswers(endResults)
				: null
	);

	console.log('SURVEY', data);
</script>

{#if showDeleteModal}
	<DeleteGroupModal {data} onClose={() => (showDeleteModal = false)} />
{/if}

<br /><br />

<a href="/admin">← Back </a>

<div class="header">
	<h1 class="title large">{data.stats?.group?.name}</h1>
	<button class="btn secondary" onclick={() => (showDeleteModal = true)}>Delete</button>
</div>

{#if data.stats?.user}
	{@const user = data.stats?.user}
	<p>
		<em
			>Led by {ROLE_PRETTY_NAMES[group.creatorRole].toLowerCase()}
			{#if group?.manualEntry}
				{user.firstName}.
				<b>This was a manually entered dataset.</b>
			{:else}
				<a href={`/admin/users/${user._id}`}>
					{#if user.firstName}
						{user.firstName}
						{user.lastName}
						{#if user.email}
							({user.email})
						{/if}
					{:else}
						{user.email}
					{/if}
				</a>.
			{/if}
		</em>
	</p>
{/if}

<h2 class="title">Shifts</h2>

<div class="wrapper">
	<AdminAnswerComparison
		{startResults}
		{endResults}
		{startAnswers}
		{endAnswers}
		averagedStartResults={data?.stats?.averagedStartResults}
		averagedEndResults={data?.stats?.averagedEndResults}
		startPollDate={group.startPollDate}
		endPollDate={group.endPollDate}
		{group}
	/>
</div>

<p class="uppercase-title">Survey Responses</p>
<h2 class="title prompt">“What did you gain from participating in this experience?”</h2>

<div class="wrapper blue">
	{#if data.surveyResponses?.length > 0}
		<!-- <p class="prompt"><i>What did you gain from participating in this experience?</i></p> -->
		<div class="responses">
			{#each data.surveyResponses as surveyResponse, idx}
				<p class="response">“{surveyResponse.text}”</p>
			{/each}
		</div>
		<img class="cloud-bg static-fade-in" src={cloudBg} alt="" />
	{:else}
		<p>No survey responses found for this facilitation.</p>
	{/if}
</div>

<div class="spacer"></div>

<style>
	.spacer {
		width: 100%;
		height: 100px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.wrapper {
		margin-bottom: 80px;
		background-color: var(--cloud-light);
		border-radius: var(--br);
		padding: 20px;
		margin-left: -20px;
		margin-right: -20px;
		position: relative;
	}
	.blue {
		/* width: 600px; */
		border: 1px solid var(--cloud-dark);
		/* background-color: var(--periwinkle); */
		display: flex;
		justify-content: center;
	}
	.blue p {
		margin: 0px;
	}
	.responses {
		width: 900px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
		position: relative;
		z-index: 1;
		/* margin: 30px 0px; */
	}
	.uppercase-title {
		margin-bottom: 0px;
	}
	.prompt {
		margin-top: 10px;
	}
	.response {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 36px;
		line-height: 1.2;
		/* width: 500px; */
		max-width: min(100%, 630px);
		box-sizing: border-box;
		/* border: 1px solid var(--cloud-light); */
		padding: 20px;
		/* background-color: var(--cloud-faded); */
		border-radius: var(--br);
	}

	.response:nth-child(even) {
		align-self: flex-end;
	}
	.cloud-bg {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		mix-blend-mode: overlay;
	}
</style>
