<script lang="ts">
	import dynamics from '$lib/dynamics';
</script>

<ol class="chart-fade-in">
	{#each dynamics as dynamic}
		<li>
			{dynamic.full}
		</li>
	{/each}
</ol>

<style>
	ol {
		display: none;
		padding: 0 1.4em;
	}
	ol li {
		margin-bottom: 1em;
	}
	@media screen and (min-width: 900px) {
		ol {
			display: block;
		}
	}
</style>
