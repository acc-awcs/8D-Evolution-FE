<script>
	import { COMPLETE } from '$lib/constants';
	import { getStatus, getStatusColor } from '$lib/helpers/presenters';
	import NewGroupModal from './NewGroupModal.svelte';
	import charts from '$lib/assets/charts.png';
	import { getIntFromID } from '$lib/helpers/general';
	import tile1 from '$lib/assets/wayfinding/tiles/tile1.png';
	import tile2 from '$lib/assets/wayfinding/tiles/tile2.png';
	import tile3 from '$lib/assets/wayfinding/tiles/tile3.png';
	import tile4 from '$lib/assets/wayfinding/tiles/tile4.png';
	import tile5 from '$lib/assets/wayfinding/tiles/tile5.png';
	import tile6 from '$lib/assets/wayfinding/tiles/tile6.png';
	import tile7 from '$lib/assets/wayfinding/tiles/tile7.png';
	import tile8 from '$lib/assets/wayfinding/tiles/tile8.png';
	import circle from '$lib/assets/wayfinding/welcome/circle.png';
	import lines from '$lib/assets/wayfinding/welcome/lines.png';
	import triangle from '$lib/assets/wayfinding/welcome/triangle.png';

	// Pretty backgrounds from the design team, should be unique to group (using uid)
	const tileBackgroundOptions = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8];

	let showNewGroupModal = $state(false);
	let { data } = $props();
</script>

{#if showNewGroupModal}
	<NewGroupModal onClose={() => (showNewGroupModal = false)} {data} />
{/if}

{#if data?.groups?.length > 0}
	<div class="wrapper">
		<div class="header">
			<h1 class="title large">Your Groups</h1>
			<button class="btn tertiary" onclick={() => (showNewGroupModal = true)}
				>Create New Group +</button
			>
		</div>
		<p class="context">
			Access the 8 Dynamics polls and maps for all of your Climate Wayfinding groups.
		</p>
		<div class="groups static-fade-in">
			{#each data?.groups || [] as group}
				{@const status = getStatus(group)}
				<a href={`/groups/g/${group._id}`}>
					<img src={tileBackgroundOptions[getIntFromID(group._id) % 8]} alt="" />
					<div class="display">
						<div class="up-next-wrapper">
							{#if status !== COMPLETE}
								<p class="up-next">Up Next</p>
							{/if}
						</div>

						<p class="status" style={`background-color:var(--${getStatusColor(status)});`}>
							<span>{status}</span>
						</p>
						<p class="group-title">{group.name}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
{:else}
	<img class="intro-img circle" alt="" src={circle} />
	<img class="intro-img triangle" alt="" src={triangle} />
	<img class="intro-img lines" alt="" src={lines} />

	<div class="intro-wrapper">
		<h1 class="title">Welcome!</h1>
		<img class="intro chart-fade-in" src={charts} alt="Two spider charts, showing growth" />

		<p>This tool equips you to do live polling with the 8 Dynamics framework.</p>
		<p class="secondary">
			For each group you lead, you’ll be able to map the shifts people experience through Climate
			Wayfinding.
		</p>
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
		text-align: center;
	}
	.intro-wrapper .title {
		margin-top: 0px;
	}
	img.intro {
		width: 800px;
		max-width: 100%;
		margin: 20px 0px;
		margin-bottom: 40px;
		height: 360.5px;
		border-radius: var(--br);
		object-fit: contain;
		/* border: 1px solid var(--neon); */
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
		width: 650px;
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
		animation-delay: 0.2s;
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
		background-color: var(--neon);
		transition: box-shadow 0.2s ease;
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
		transition: text-decoration-color 0.2s ease;
		text-decoration: underline;
		text-decoration-color: transparent;
	}
	.groups a:hover .group-title {
		text-decoration-color: var(--onyx);
	}
	.groups a:hover {
		box-shadow: 0px 0px 10px 0px rgba(26, 28, 39, 0.2);
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
		padding: 0px 12px;

		border-radius: 20px;
		font-size: 14px;
		font-weight: 700;
		/* color: var(--cloud); */
		display: inline-block;
	}

	.status span {
		position: relative;
		top: 2px;
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
		width: 100%;
		right: 0px;
		top: 0px;
		/* top: 100px; */
		opacity: 1;
	}
	.intro-img {
		position: absolute;
		top: -50px;
	}
	.circle {
		top: 0%;
		right: 0px;
	}
	.lines {
		left: 60px;
		top: 0px;
	}
	.triangle {
		left: 0px;
		width: 200px;
	}
	.secondary {
		margin-top: 0px;
		margin-bottom: 20px;
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
		.intro-img {
			display: none;
		}
		img.intro {
			height: auto;
		}
	}
</style>
