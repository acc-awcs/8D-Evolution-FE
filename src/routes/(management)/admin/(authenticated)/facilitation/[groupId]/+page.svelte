<script>
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';
	import { formatAnswers, formatManualAnswers } from '$lib/helpers/results';
	import DeleteGroupModal from './DeleteGroupModal.svelte';
	import cloudBg from '$lib/assets/cloud-bg.jpg';
	import EditModal from './EditModal.svelte';

	let { data } = $props();

	let showDeleteModal = $state(false);
	let showTestModal = $state(false);

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
</script>

{#if showDeleteModal}
	<DeleteGroupModal {data} onClose={() => (showDeleteModal = false)} />
{/if}

{#if showTestModal}
	<EditModal data={{ group }} onClose={() => (showTestModal = false)} />
{/if}

<br /><br />

<a href="/admin">← Back </a>

<div class="header">
	<h1 class="title large">{data.stats?.group?.name}</h1>
	<div class="buttons">
		<button class="btn secondary" onclick={() => (showTestModal = true)}>Edit</button>
		<button class="btn secondary" onclick={() => (showDeleteModal = true)}>Delete</button>
	</div>
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

{#if data.stats?.group?.isTest}
	<div class="test-note">
		<p>
			<strong>Please note:</strong> This has been marked as a test faciliation. Results from this
			facilitation are not included in generated statistics.
			<button class="link-like" onclick={() => (showTestModal = true)}>Edit</button>
		</p>
	</div>
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
		<div class="responses">
			{#each data.surveyResponses as surveyResponse, idx}
				<p class="response">
					“{surveyResponse.text}”<br />
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`/quiz/results/${surveyResponse.resultCode}`}>View Web</a
					>
				</p>
			{/each}
		</div>
		<img class="cloud-bg static-fade-in" src={cloudBg} alt="" />
	{:else}
		<p>No survey responses found for this facilitation.</p>
	{/if}
</div>

<div class="spacer"></div>

<style>
	.buttons {
		display: flex;
		gap: 8px;
	}
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
		/* background-color: var(--cloud-light); */
		border: 1px solid var(--cloud-dark);

		border-radius: var(--br);
		padding: 12px;
		margin-left: -12px;
		margin-right: -12px;
		position: relative;
	}
	.blue {
		/* width: 600px; */
		border: 1px solid var(--cloud-dark);
		background-color: var(--cloud);
		display: flex;
		justify-content: center;
		overflow: hidden;
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
		margin: 50px 0px;
		/* margin-top: 80px; */
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
		font-size: 32px;
		line-height: 1.4;
		/* width: 500px; */
		max-width: min(100%, 630px);
		box-sizing: border-box;
		/* border: 1px solid var(--cloud-light); */
		padding: 20px;
		/* background-color: var(--cloud-faded); */
		border-radius: var(--br);
	}

	.response a {
		display: block;
		font-size: 16px;
		margin-top: 18px;
		opacity: 0.6;
	}

	.response a:hover {
		opacity: 1;
	}

	.response:nth-child(even) {
		align-self: flex-end;
	}
	.cloud-bg {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		/* mix-blend-mode: overlay; */
	}

	.test-note {
		background-color: var(--soil-light);
		display: inline-block;
		padding: 12px 20px;
		border-radius: var(--br);
	}

	.test-note .link-like {
		font-size: 16px;
	}

	.test-note p {
		margin: 0px;
	}
</style>
