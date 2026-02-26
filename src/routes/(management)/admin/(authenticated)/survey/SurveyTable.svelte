<script>
	import DeleteSurveyModal from './DeleteSurveyModal.svelte';

	let {
		rows,
		showDelete = false,
		secondRowLinks = null,
		thirdRowLinks = null,
		ids = null,
		header
	} = $props();
	let selectedSurvey = $state(null);
</script>

{#if selectedSurvey}
	<DeleteSurveyModal onClose={() => (selectedSurvey = null)} surveyId={selectedSurvey} />
{/if}

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				{#each header as headerItem}
					<th>{headerItem}</th>
				{/each}
				{#if showDelete}
					<th> Delete </th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each rows as row, rowIdx}
				<tr>
					{#each row as item, itemIdx}
						<td>
							{#if secondRowLinks && itemIdx === 1}
								{#if secondRowLinks[rowIdx]}
									<a href={secondRowLinks[rowIdx]}>{item}</a>
								{:else}
									<span class="muted">{item}</span>
								{/if}
							{:else if thirdRowLinks && itemIdx === 2}
								{#if thirdRowLinks[rowIdx]}
									<a href={thirdRowLinks[rowIdx]}>{item}</a>
								{:else}
									<span class="muted">{item}</span>
								{/if}
							{:else}
								{item}
							{/if}
						</td>
					{/each}
					{#if showDelete}
						<td>
							<button onclick={() => (selectedSurvey = ids[rowIdx])}>Delete</button>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-wrapper {
		width: 100%;
		border: 1px solid var(--onyx);
		border-collapse: collapse;
		border-radius: var(--br);
		overflow: hidden;
		background-color: var(--cloud);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background-color: var(--cloud-dark);
	}

	thead tr {
		border-top: none;
	}

	tr {
		display: flex;
		border-top: 1px solid var(--onyx);
	}

	th,
	td {
		padding: 12px;
		padding-top: 14px;
		flex: 1;
		text-align: center;
	}

	.muted {
		opacity: 0.6;
		font-style: italic;
	}
</style>
