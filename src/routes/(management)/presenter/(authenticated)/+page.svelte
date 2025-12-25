<script>
	import { COMPLETE, END } from '$lib/constants';
	import { getStatus, getStatusColor } from '$lib/helpers/presenters';
	import NewGroupModal from './NewGroupModal.svelte';

	let showNewGroupModal = $state(false);
	let { data } = $props();
</script>

{#if showNewGroupModal}
	<NewGroupModal onClose={() => (showNewGroupModal = false)} {data} />
{/if}

<div>
	<h1 class="title">Your Groups</h1>
	<div class="header">
		<p>
			Help groups visualize their Climate Wayfinding progress through collective 8 Dynamics
			assessments.
		</p>
		<button class="link-like" onclick={() => (showNewGroupModal = true)}
			>+ Create a new group</button
		>
	</div>
	<!-- TODO: add "if no groups" welcome flow! -->
	<div class="groups">
		{#each data?.groups || [] as group}
			{@const status = getStatus(group)}
			<a href={`/presenter/group/${group._id}`}>
				<p class="group-title">{group.name}</p>
				<div class="display">
					{#if status !== END}
						<p class="up-next">Up Next</p>
					{/if}
					<p class="status" style={`background-color:var(--${getStatusColor(status)})`}>
						{status}
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		gap: 16px;
	}
	.link-like {
		font-size: 16px;
	}
	.groups {
		display: flex;
		gap: 26px;
		flex-wrap: wrap;
		margin-top: 20px;
	}
	.groups p {
		margin: 0px;
	}
	.groups a {
		width: 340px;
		height: 260px;
		max-width: 100%;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #fff;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
		padding: 16px;
		box-sizing: border-box;
		align-items: flex-start;
		border-radius: var(--br);
	}
	.group-title {
		font-family: 'Instrument Serif', serif;
		font-size: 28px;
		line-height: 36px;
	}
	.groups a:hover .group-title {
		text-decoration: underline;
	}
	.up-next {
		text-transform: uppercase;
		font-size: 16px;
		opacity: 0.8;
	}
	.status {
		padding: 1px 12px;
		padding-top: 2px;
		border-radius: 20px;
		color: var(--cloud);
	}
	@media screen and (max-width: 600px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 30px;
		}
		.groups a {
			width: 100%;
		}
	}
</style>
