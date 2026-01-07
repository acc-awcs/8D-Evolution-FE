<script>
	import Table from '$lib/components/Table.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';

	let { data } = $props();
</script>

<h1 class="title">User Management</h1>

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
