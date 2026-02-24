<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Eye from '$lib/components/Eye.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';

	let { data } = $props();

	const updateQueryParam = (key, value) => {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		if (value) {
			newSearchParams.set(key, value);
		} else {
			newSearchParams.delete(key);
		}
		goto(`?${newSearchParams.toString()}`, { replaceState: true });
	};
</script>

<h1 class="title large">User Management</h1>

<div class="btn-wrapper">
	{#if data.query?.showGroupLeads === 'true'}
		<button class="link-like" onclick={() => updateQueryParam('showGroupLeads', 'false')}>
			<Eye visible={true} />
			Hide group leads</button
		>
	{:else}
		<button class="link-like" onclick={() => updateQueryParam('showGroupLeads', 'true')}>
			<Eye visible={false} />Show group leads</button
		>
	{/if}
</div>

<Table
	header={['Email', 'Role', 'Created on']}
	rowLinks={data.users.map((user) => `/admin/users/${user._id}`)}
	rows={data.users.map((user) => [
		user.email,
		ROLE_PRETTY_NAMES[user.role],
		user.createdAt
			? new Date(user.createdAt).toLocaleString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: 'N/A'
	])}
/>
<Pagination {data} />

<style>
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
