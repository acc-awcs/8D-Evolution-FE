<script>
	import { COMPLETE, END, START } from '$lib/constants';
	import { getStatus, getStatusColor } from '$lib/helpers/presenters';
	import NewGroupModal from './NewGroupModal.svelte';
	import mushrooms from '$lib/assets/mushrooms.png';
	import flowers from '$lib/assets/flowers.png';
	import butterfly from '$lib/assets/butterfly.png';
	import charts from '$lib/assets/charts.png';

	let showNewGroupModal = $state(false);
	let { data } = $props();
	const imagesByStatus = {
		[COMPLETE]: flowers,
		[END]: butterfly,
		[START]: mushrooms
	};
</script>

{#if showNewGroupModal}
	<NewGroupModal onClose={() => (showNewGroupModal = false)} {data} />
{/if}

{#if data?.groups?.length > 0}
	<div class="wrapper">
		<div class="header">
			<h1 class="title large">Your Groups</h1>
			<button class="btn tertiary" onclick={() => (showNewGroupModal = true)}
				>Create a new Group +</button
			>
		</div>
		<p class="context">
			Help groups visualize their Climate Wayfinding progress through collective 8 Dynamics
			assessments.
		</p>
		<div class="groups">
			{#each data?.groups || [] as group}
				{@const status = getStatus(group)}
				<a
					href={`/presenter/group/${group._id}`}
					style={`background-color:var(--${getStatusColor(status)});`}
				>
					<!-- <img src={imagesByStatus[status]} alt="" /> -->
					<!-- <div class="overlay"></div> -->
					<div class="display">
						<div class="up-next-wrapper">
							{#if status !== COMPLETE}
								<p class="up-next">Up Next</p>
							{/if}
						</div>

						<p class="status" style={`background-color:var(--${getStatusColor(status)});`}>
							{status}
						</p>
						<p class="group-title">{group.name}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
{:else}
	<div class="intro-wrapper">
		<h1 class="title">Welcome!</h1>
		<p>
			This tool generates presentable polls for you to use during your Climate Wayfinding
			facilitations.
		</p>
		<p>
			For each group you facilitate, you'll be able to visually compare the growth before and after
			your work together.
		</p>
		<img class="intro chart-fade-in" src={charts} alt="Two spider charts, showing growth" />
		<button class="btn primary" onclick={() => (showNewGroupModal = true)}
			>Create Your First Group</button
		>
	</div>
{/if}

<style>
	.intro-wrapper {
		padding: 60px 0px;
		/* height: 88vh; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.intro-wrapper .title {
		margin-top: 0px;
	}
	img.intro {
		width: 800px;
		max-width: 100%;
		margin: 20px 0px;
		margin-bottom: 40px;
	}
	.wrapper {
		min-height: 85vh;
	}
	.wrapper .title {
		margin: 10px 0px;
	}
	.header {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}
	.context {
		width: 521px;
		max-width: 100%;
	}
	.groups {
		display: flex;
		gap: 26px;
		row-gap: 40px;
		flex-wrap: wrap;
		margin-top: 40px;
		padding-bottom: 50px;
		max-width: 100%;
		box-sizing: border-box;
	}
	.groups p {
		margin: 0px;
	}
	.groups a {
		width: 290px;
		height: 300px;
		max-width: 100%;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		background-color: #fff;
		/* box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1); */
		box-sizing: border-box;
		align-items: flex-start;
		border-radius: var(--br);
		position: relative;
		overflow: hidden;
	}
	.group-title {
		font-family: 'Instrument Serif', serif;
		font-size: 22px;
		line-height: 36px;
		padding-top: 6px;
		padding-bottom: 4px;
	}
	.groups a:hover .group-title {
		text-decoration: underline;
	}
	.up-next-wrapper {
		height: 28px;
		width: 100%;
	}
	.up-next {
		text-transform: uppercase;
		font-size: 12px;
		font-weight: 500;
		/* opacity: 0.8; */
	}
	.status {
		padding: 1px 12px;
		padding-top: 2px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 700;
		/* color: var(--cloud); */
		display: inline-block;
	}

	.display {
		background-color: var(--cloud);
		padding: 12px;
		padding-top: 8px;
		width: 100%;
		box-sizing: border-box;
	}
	.display,
	.group-title {
		position: relative;
		z-index: 1;
	}

	.groups img {
		position: absolute;
		width: 120px;
		right: 0px;
		top: 100px;
		opacity: 1;
	}

	.overlay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 400px;
		background: linear-gradient(#ffffff90, #ffffffad);
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
