<script lang="ts">
	let { data } = $props();
</script>

<h1 class="title large">Individual User Data</h1>

<p>Browse data submitted from <strong>individual users</strong>.</p>

<p>Coming soon!</p>

<!-- <h2 class="title small">Beep</h2> -->

<!-- {#await data.chartData}
	<p>Loading statistics ...</p>
{:then data}
	<LineChart {data} />
{/await}

<hr />

<h2 class="title small">Aggregated Stats</h2> -->

<!-- {#await data.aggregateData}
	<p>Loading statistics ...</p>
{:then data}
	<p></p>
	{#if data?.stats?.length > 0 && data.totalAverageStart?.[0] && data.totalAverageEnd?.[0]}
		{@const totalAverageStart = [4.4, 3.8, 3.4, 3.0, 3.2, 2.8, 3.0, 3.7]}
		{@const totalAverageEnd = [4.8, 4.2, 4.2, 4.2, 4.0, 4.0, 4.0, 4.4]}
		<AdminAnswerComparison
			startAnswers={formatAveragedAnswers(totalAverageStart)}
			endAnswers={formatAveragedAnswers(totalAverageEnd)}
			averagedStartResults={data.totalAverageStart}
			averagedEndResults={data.totalAverageEnd}
		/>
	{:else}
		<p>No complete facilitations available to display statistics. Check back later!</p>
	{/if}
{/await} -->

<div class="space"></div>

<style>
	.title.small {
		margin-top: 60px;
	}
	.space {
		width: 100%;
		padding-bottom: 100px;
	}
</style>
