<script>
	import AdminAnswerComparison from '$lib/components/AdminAnswerComparison.svelte';
	import { ROLE_PRETTY_NAMES } from '$lib/constants.js';
	import { formatAnswers } from '$lib/helpers/results';

	let { data } = $props();

	const startResults = $derived(data.stats?.startResults);
	const endResults = $derived(data.stats?.startResults);
	const startAnswers = $derived(startResults?.length > 0 ? formatAnswers(startResults) : null);
	const endAnswers = $derived(endResults?.length > 0 ? formatAnswers(endResults) : null);
</script>

<br /><br />

<a href="/admin">← Back </a>

<h1 class="title">{data.stats?.group?.name}</h1>

{#if data.stats?.user}
	{@const user = data.stats?.user}
	<p>
		<em
			>Led by {ROLE_PRETTY_NAMES[user.role].toLowerCase()}
			<a href={`/admin/users/${user._id}`}>
				{#if user.firstName}
					{user.firstName} {user.lastName} ({user.email})
				{:else}
					{user.email}
				{/if}
			</a>
		</em>
	</p>
{/if}

<AdminAnswerComparison
	{startResults}
	{endResults}
	{startAnswers}
	{endAnswers}
	averagedStartResults={data?.stats?.averagedStartResults}
	averagedEndResults={data?.stats?.averagedEndResults}
	startPollDate={data.stats?.group.startPollDate}
	endPollDate={data.stats?.group.endPollDate}
/>
