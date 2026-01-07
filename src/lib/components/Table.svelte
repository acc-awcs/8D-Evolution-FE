<script>
	let { rows, header } = $props();
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
			{#each rows as row}
				<tr>
					{#each row as item}
						<td>{item}</td>
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
		padding-top: 2px;
		border-top: none;
	}

	tr {
		display: flex;
		border-top: 1px solid var(--onyx);
	}

	th,
	td {
		padding: 8px;
		flex: 1;
		text-align: center;
	}
</style>
