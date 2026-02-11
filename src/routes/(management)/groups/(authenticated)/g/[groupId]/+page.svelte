<script>
	import { enhance } from '$app/forms';
	import LoaderLink from '$lib/components/LoaderLink.svelte';
	import SettingsButton from '$lib/components/SettingsButton.svelte';
	import SubmitButton from '$lib/components/SubmitButton.svelte';
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
	let navigationLoading = $state(false);
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

<div class="back-wrapper">
	<a href="/groups" class="back">← Back to all groups</a>
</div>

<div class="header">
	<h1 class="title">{group.name}</h1>
	<SettingsButton onClick={() => (showSettingsModal = true)} />
</div>

<div class="actions">
	<ActionBox
		number={1}
		color={getStatusColor(START)}
		active={true}
		title="Map Collective Starting Point"
	>
		<p>From your computer, begin a live poll to map your group's starting point.</p>
		{#if group.startPollCode && group.startPollInitiated}
			<div class="buttons">
				<button class="link-like" type="button" onclick={() => (showResetStartModal = true)}
					>Retake Poll</button
				>
				<a class="btn primary" href={`/groups/g/${group._id}/start/review`}> View Results </a>
			</div>
		{:else}
			<form
				method="POST"
				action="?/beginPoll"
				use:enhance={() => {
					navigationLoading = true;
					return async ({ update }) => {
						await update();
						navigationLoading = false;
					};
				}}
			>
				<input type="hidden" name="isStart" value="true" />
				<SubmitButton loading={navigationLoading}>Begin Poll</SubmitButton>
			</form>
		{/if}
	</ActionBox>
	<ActionBox
		number={2}
		color={getStatusColor(END)}
		active={status !== START}
		title="Map Collective Ending Point"
	>
		<p>
			Ready to see what's shifted? From your computer, begin a live poll to map your group's ending
			point.
		</p>
		{#if status === START}
			<p class="note">Available once the starting point map has been completed.</p>
		{:else if group.endPollCode && group.endPollInitiated}
			<div class="buttons">
				<button class="link-like" type="button" onclick={() => (showResetEndModal = true)}
					>Retake Poll</button
				>
				<a class="btn primary" href={`/groups/g/${group._id}/end/review`}> View Results </a>
			</div>
		{:else}
			<form
				method="POST"
				action="?/beginPoll"
				use:enhance={() => {
					navigationLoading = true;
					return async ({ update }) => {
						await update();
						navigationLoading = false;
					};
				}}
			>
				<input type="hidden" name="isStart" value="false" />
				<SubmitButton loading={navigationLoading}>Begin Poll</SubmitButton>
			</form>
		{/if}
	</ActionBox>
	<ActionBox
		number={3}
		color={getStatusColor(COMPLETE)}
		active={status === COMPLETE}
		title="Review Collective Shift"
	>
		<p>Revisit the collective shift between your group's starting and ending points.</p>
		{#if status === COMPLETE}
			<LoaderLink href={`/groups/g/${group._id}/end/review/shift`}>Review Shift</LoaderLink>
		{:else}
			<p class="note">Available once both maps have been completed.</p>
		{/if}
	</ActionBox>
</div>

<style>
	.back-wrapper {
		padding-top: 20px;
	}
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

	p {
		width: 620px;
		max-width: 100%;
	}

	@media screen and (max-width: 600px) {
		.header {
			flex-direction: column-reverse;
			align-items: flex-end;
			justify-content: flex-start;
		}
		.title {
			margin-right: auto;
		}
	}
</style>
