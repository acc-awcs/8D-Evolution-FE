<script lang="ts">
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import TimeRangePicker from '$lib/components/TimeRangePicker.svelte';
	import { formatAveragedAnswers } from '$lib/helpers/results.js';
	let { data } = $props();
	console.log('da', data);
</script>

<h1 class="title large">Survey Responses</h1>

<p>Browse all survey responses.</p>

<TimeRangePicker {data} />

{#if data?.invalidTimes}
	<p>{data.msg}</p>
{:else if data?.totalSurveys > 0}
	<h2 class="title prompt">“What did you gain from participating in this experience?”</h2>
	<div class="alt-wrapper">
		{#if data?.paginatedSurveys?.length > 0}
			<Table
				header={['Response', 'Facilitation', 'Results Link', 'Date']}
				secondRowLinks={data.paginatedSurveys.map((resp: any) =>
					resp.facilitationId ? `/admin/facilitation/${resp.facilitationId}` : null
				)}
				thirdRowLinks={data.paginatedSurveys.map((resp: any) =>
					resp.resultCode ? `/quiz/results/${resp.resultCode}` : null
				)}
				rows={data.paginatedSurveys.map((resp: any) => [
					resp.text,
					resp.facilitationName ? resp.facilitationName : 'Not available',
					'View Web',
					resp.createdDate
				])}
			/>
			<Pagination {data} />
		{:else}
			<p>No facilitations to display.</p>
		{/if}
	</div>
{:else}
	<p>No data to display. Check back later!</p>
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
	.alt-wrapper {
		padding: 12px 0px;
	}
	.wrapper {
		margin-bottom: 80px;
		/* background-color: var(--cloud-light); */
		border: 1px solid var(--cloud-darker);
		border-radius: var(--br);
		padding: 12px;
		margin-left: -12px;
		margin-right: -12px;
	}
</style>
