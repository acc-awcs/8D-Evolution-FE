<script lang="ts">
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import TimeRangePicker from '$lib/components/TimeRangePicker.svelte';
	import { formatAveragedAnswers } from '$lib/helpers/results.js';
	let { data } = $props();
</script>

<h1 class="title large">Trained Facilitator Data</h1>

<p>Browse data from 8 Dynamics polls run by <strong>trained facilitators</strong>.</p>

<TimeRangePicker {data} />

{#if data?.invalidTimes}
	<p>{data.msg}</p>
{:else}
	{#if data?.stats?.length > 0 && data.totalAverageStart?.[0] && data.totalAverageEnd?.[0]}
		<h2 class="title">Activity</h2>
		<div class="wrapper">
			<div class="callout">
				<div class="item">
					<h3 class="uppercase-title">Total Participants</h3>
					<p class="title large">{data.totalParticipants}</p>
				</div>
				<div class="item">
					<h3 class="uppercase-title">Groups Created</h3>
					<p class="title large">{data.totalNewGroups}</p>
				</div>
			</div>
			{#if data?.participantsByMonth?.length > 1}
				{#key `${data.query.startDate} ${data.query.endDate} ${data.query.timeRange}`}
					<LineChart data={data?.participantsByMonth} />
				{/key}
			{/if}
		</div>
		<h2 class="title">Shifts</h2>
		<div class="wrapper">
			<AdminAnswerComparison
				startAnswers={formatAveragedAnswers(data.totalAverageStart)}
				endAnswers={formatAveragedAnswers(data.totalAverageEnd)}
				averagedStartResults={data.totalAverageStart}
				averagedEndResults={data.totalAverageEnd}
			/>
		</div>
	{:else}
		<p>No complete facilitations available to display statistics. Check back later!</p>
	{/if}

	<h2 class="title">Groups</h2>
	<div class="wrapper">
		{#if data?.paginatedGroups?.length > 0}
			<Table
				header={['Facilitation', 'Facilitator', 'Participants', 'Start Poll Date', 'End Poll Date']}
				rowLinks={data.paginatedGroups.map((group: any) => `/admin/facilitation/${group._id}`)}
				rows={data.paginatedGroups.map((group: any) => [
					group.name,
					group.creatorShortName,
					group.numParticipants,
					group.startPollDate
						? new Date(group.startPollDate).toLocaleString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})
						: 'N/A',
					group.endPollDate
						? new Date(group.endPollDate).toLocaleString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})
						: 'N/A'
				])}
			/>
			<Pagination {data} />
		{:else}
			<p>No facilitations to display.</p>
		{/if}
	</div>
{/if}

<div class="space"></div>

<style>
	.callout {
		display: flex;
		justify-content: space-around;
	}
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin: 30px;
		/* gap: 30px; */
	}
	.item p {
		margin: 0px;
	}
	h2 {
		margin-top: 60px;
	}
	.space {
		width: 100%;
		padding-bottom: 100px;
	}
	.wrapper {
		margin-bottom: 80px;
		background-color: var(--cloud-light);
		/* border: 1px solid var(--cloud-darker); */
		border-radius: var(--br);
		padding: 12px;
		margin-left: -12px;
		margin-right: -12px;
	}
</style>
