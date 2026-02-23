<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	function updateQueryParam(key: string, value: string) {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		if (key !== 'p') {
			newSearchParams.delete('p');
		}
		if (value) {
			newSearchParams.set(key, value);
		} else {
			newSearchParams.delete(key);
		}
		goto(`?${newSearchParams.toString()}`, { replaceState: true, noScroll: true, keepFocus: true });
	}

	const timeRange = $derived(data.query.timeRange);
	const startDate = $derived(data.query.startDate);
	const endDate = $derived(data.query.endDate);
</script>

<div class="date-select">
	<label>
		Time Range <select
			required
			name="timeRange"
			value={timeRange}
			onchange={(e) => updateQueryParam('tr', e.target?.value)}
		>
			<option value="all">All Time</option>
			<option value="custom">Custom</option>
		</select>
	</label>
	{#if timeRange === 'custom'}
		<label>
			Start Date (inclusive, based on Start Poll Date)
			<input
				type="date"
				value={startDate}
				onchange={(e) => updateQueryParam('s', e.target?.value)}
			/>
		</label>
		<label>
			End Date (inclusive, based on Start Poll Date)
			<input type="date" value={endDate} onchange={(e) => updateQueryParam('e', e.target?.value)} />
		</label>
	{/if}
</div>

<style>
	.date-select {
		display: flex;
		gap: 20px;
		margin-bottom: 40px;
		/* position: sticky; */
		/* top: 10px; */
		background-color: var(--periwinkle);
		/* border: 1px solid var(--onyx); */
		border-radius: var(--br);
		/* border-bottom: 1px solid var(--onyx); */
		z-index: 20;
		padding: 14px 14px;
		margin-left: -14px;
		margin-right: -14px;
	}
	.date-select label {
		flex: 1;
		margin: 0px 0px;
	}
	.date-select label input,
	.date-select label select {
		width: 100%;
		max-width: 406px;
	}
</style>
