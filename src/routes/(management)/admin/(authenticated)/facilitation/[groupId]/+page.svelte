<script>
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';
	import { formatAnswers, formatManualAnswers } from '$lib/helpers/results';
	import DeleteGroupModal from './DeleteGroupModal.svelte';

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
</script>

{#if showDeleteModal}
	<DeleteGroupModal {data} onClose={() => (showDeleteModal = false)} />
{/if}

<br /><br />

<a href="/admin">← Back </a>

<div class="header">
	<h1 class="title">{data.stats?.group?.name}</h1>
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
</style>
