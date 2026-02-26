<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import TimeRangePicker from '$lib/components/TimeRangePicker.svelte';
	import ExportModal from './ExportModal.svelte';
	import SurveyTable from './SurveyTable.svelte';
	let { data } = $props();

	let showDelete = $state(false);
	let showExportModal = $state(false);
</script>

{#if showExportModal}
	<ExportModal onClose={() => (showExportModal = false)} />
{/if}

<h1 class="title large">Survey Responses</h1>

<p>
	Browse all survey responses. Or,
	<button class="link-like" onclick={() => (showExportModal = true)}
		>export the survey dataset
	</button> to run your own analysis.
</p>

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
				header={['Response', 'Facilitation', 'End Results Link', 'Date']}
				secondRowLinks={data.paginatedSurveys.map((resp: any) =>
					resp.facilitationId ? `/admin/facilitation/${resp.facilitationId}` : null
				)}
				thirdRowLinks={data.paginatedSurveys.map((resp: any) =>
					resp.resultCode ? `/admin/survey/${resp.resultCode}` : null
				)}
				ids={data.paginatedSurveys.map((resp: any) => resp._id)}
				rows={data.paginatedSurveys.map((resp: any) => [
					resp.text,
					resp.facilitationName ? resp.facilitationName : 'Not available',
					'View Ending Point',
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
	.link-like {
		display: inline;
		font-size: 16px;
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
		margin-bottom: 15px;
	}
</style>
