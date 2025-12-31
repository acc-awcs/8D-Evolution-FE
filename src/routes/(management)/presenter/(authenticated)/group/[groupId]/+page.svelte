<script>
	import SettingsButton from '$lib/components/SettingsButton.svelte';
	import { COMPLETE, END, START } from '$lib/constants.js';
	import { getStatus, getStatusColor } from '$lib/helpers/presenters';
	import ActionBox from './ActionBox.svelte';
	import GroupSettingsModal from './GroupSettingsModal.svelte';
	import ResetModal from './ResetModal.svelte';

	let { data } = $props();
	let group = $derived(data.group);
	let status = $derived(getStatus(group));
	let showSettingsModal = $state(false);
	let showResetStartModal = $state(false);
	let showResetEndModal = $state(false);
</script>

{#if showSettingsModal}
	<GroupSettingsModal {data} onClose={() => (showSettingsModal = false)} />
{/if}

{#if showResetStartModal}
	<ResetModal
		startOrEnd="start"
		hasEndData={group.endPollCode && group.endPollInitiated}
		{data}
		onClose={() => (showResetStartModal = false)}
	/>
{/if}

{#if showResetEndModal}
	<ResetModal
		startOrEnd="end"
		hasEndData={false}
		{data}
		onClose={() => (showResetEndModal = false)}
	/>
{/if}

<a href="/presenter" class="back">← Back to all groups</a>
<!-- {@const group = data.group} -->
<div class="header">
	<h1 class="title">{group.name}</h1>
	<SettingsButton onClick={() => (showSettingsModal = true)} />
</div>

<div class="actions">
	<ActionBox number={1} color={getStatusColor(START)} active={true}>
		<h2>Map Collective Starting Point</h2>
		<p>Begin a presentation to map your group's collective 8 Dynamics starting point.</p>
		{#if group.startPollCode && group.startPollInitiated}
			<div class="buttons">
				<button class="link-like" type="button" onclick={() => (showResetStartModal = true)}
					>Retake Poll</button
				>
				<a class="btn primary" href={`/presenter/group/${group._id}/start/review`}>
					View Results
				</a>
			</div>
		{:else}
			<form method="POST" action="?/beginPoll">
				<input type="hidden" name="isStart" value="true" />
				<button class="btn primary" type="submit">Begin Poll</button>
			</form>
		{/if}
	</ActionBox>
	<ActionBox number={2} color={getStatusColor(END)} active={status !== START}>
		<h2>Map Collective Ending Point</h2>
		<p>
			Ready to see the results of your group's learnings? Begin the presentation to map your group's
			collective ending point.
		</p>
		{#if status === START}
			<p class="note">Available once the collective starting point map has been completed.</p>
		{:else if group.endPollCode && group.endPollInitiated}
			<div class="buttons">
				<button class="link-like" type="button" onclick={() => (showResetEndModal = true)}
					>Retake Poll</button
				>
				<a class="btn primary" href={`/presenter/group/${group._id}/end/review`}> View Results </a>
			</div>
		{:else}
			<form method="POST" action="?/beginPoll">
				<input type="hidden" name="isStart" value="false" />
				<button class="btn primary" type="submit">Begin Poll</button>
			</form>
		{/if}
	</ActionBox>
	<ActionBox number={3} color={getStatusColor(COMPLETE)} active={status === COMPLETE}>
		<h2>View Collective Shift</h2>
		<p>View the collective shift between your group's starting and ending points.</p>
		{#if status === COMPLETE}
			<a class="btn primary" href={`/presenter/group/${group._id}/end/review/comparison?sf=t`}>
				View Shift
			</a>
		{:else}
			<p class="note">Available once both mappings have been completed.</p>
		{/if}
	</ActionBox>
</div>

<style>
	.back {
		margin-top: 8px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}
	.note {
		font-style: italic;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: center;
		align-items: center;
	}
	.buttons .link-like {
		font-size: 16px;
	}

	@media screen and (max-width: 600px) {
		.title {
			margin-right: auto;
		}
		.header {
			flex-direction: column-reverse;
			align-items: flex-end;
			justify-content: flex-start;
		}
	}
</style>
