<script lang="ts">
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import Eye from '$lib/components/Eye.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import TimeRangePicker from '$lib/components/TimeRangePicker.svelte';
	import { formatAveragedAnswers } from '$lib/helpers/results.js';
	import SurveyTable from './SurveyTable.svelte';
	let { data } = $props();

	let showDelete = $state(false);
</script>

<h1 class="title large">Survey Responses</h1>

<p>Browse all survey responses.</p>

<TimeRangePicker {data} />

{#if data?.invalidTimes}
	<p>{data.msg}</p>
{:else if data?.totalSurveys > 0}
	<h2 class="title prompt">“What did you gain from participating in this experience?”</h2>
	<!-- <div class="btn-wrapper">
		{#if showDelete}
			<button class="link-like" onclick={() => (showDelete = false)}>
				<Eye visible={true} />
				Hide delete option</button
			>
		{:else}
			<button class="link-like" onclick={() => (showDelete = true)}>
				<Eye visible={false} />Show delete option</button
			>
		{/if}
	</div> -->
	<div class="alt-wrapper">
		{#if data?.paginatedSurveys?.length > 0}
			<SurveyTable
				{showDelete}
				header={['Response', 'Facilitation', 'Results Link', 'Date']}
				secondRowLinks={data.paginatedSurveys.map((resp: any) =>
					resp.facilitationId ? `/admin/facilitation/${resp.facilitationId}` : null
				)}
				thirdRowLinks={data.paginatedSurveys.map((resp: any) =>
					resp.resultCode ? `/quiz/results/${resp.resultCode}` : null
				)}
				ids={data.paginatedSurveys.map((resp: any) => resp._id)}
				rows={data.paginatedSurveys.map((resp: any) => [
					resp.text,
					resp.facilitationName ? resp.facilitationName : 'Not available',
					'View Web',
					resp.createdDate
				])}
			/>
			<Pagination {data} />
		{:else}
			<p>No data to display.</p>
		{/if}
	</div>
{:else}
	<p>No data to display. Check back later!</p>
{/if}

<div class="space"></div>

<style>
	.prompt {
		/* margin-bottom: 0px; */
		margin-top: 80px;
	}
	.space {
		width: 100%;
		padding-bottom: 100px;
	}
	.alt-wrapper {
		padding: 12px 0px;
	}
	.btn-wrapper {
		display: flex;
		justify-content: flex-end;
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
		margin-bottom: 15px;
	}
</style>
