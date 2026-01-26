<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	function updateQueryParam(key: string, value: string) {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		if (value) {
			newSearchParams.set(key, value);
		} else {
			newSearchParams.delete(key);
		}
		goto(`?${newSearchParams.toString()}`, { replaceState: true });
	}

	const currentPage = $derived(parseInt(data.query.page));
</script>

<div class="pagination">
	<button
		class="link-like"
		onclick={() => updateQueryParam('p', `${currentPage - 1}`)}
		disabled={currentPage === 0}>Previous Page</button
	>
	<div>Page {currentPage + 1} of {data.totalPages}</div>
	<button
		class="link-like"
		onclick={() => updateQueryParam('p', `${currentPage + 1}`)}
		disabled={currentPage + 1 === data.totalPages}>Next Page</button
	>
</div>

<style>
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 20px 0px;
	}
</style>
