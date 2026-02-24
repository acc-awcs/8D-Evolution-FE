<script>
	let { rows, rowLinks = null, secondRowLinks = null, thirdRowLinks = null, header } = $props();
</script>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				{#each header as headerItem}
					<th>{headerItem}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row, rowIdx}
				<tr>
					{#each row as item, itemIdx}
						<td>
							{#if rowLinks && itemIdx === 0}
								<a href={rowLinks[rowIdx]}>{item}</a>
							{:else if secondRowLinks && itemIdx === 1}
								{#if secondRowLinks[rowIdx]}
									<a href={secondRowLinks[rowIdx]}>{item}</a>
								{:else}
									<span class="muted">{item}</span>
								{/if}
							{:else if thirdRowLinks && itemIdx === 2}
								{#if thirdRowLinks[rowIdx]}
									<a target="_blank" rel="noopener noreferrer" href={thirdRowLinks[rowIdx]}
										>{item}</a
									>
								{:else}
									<span class="muted">{item}</span>
								{/if}
							{:else}
								{item}
							{/if}
						</td>
					{/each}
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
