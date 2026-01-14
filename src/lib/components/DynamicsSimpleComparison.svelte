<script lang="ts">
	import dynamics from '$lib/dynamics';

	let {
		startAnswers = null,
		endAnswers = null
	}: {
		startAnswers?: number[] | null;
		endAnswers?: number[] | null;
	} = $props();
</script>

<ol>
	<li>
		<div>Dynamic</div>
		<div class="results">
			<span class="s">Start</span>
			<span class="arrow"></span>
			<span class="e">End</span>
		</div>
	</li>
	{#each dynamics as dynamic, idx}
		<li>
			<div>
				<span class="index">{idx + 1}.</span>
				{dynamic.full}
			</div>
			<div class="results">
				<span class="s">{startAnswers?.[idx].toFixed(1) || ''}</span>
				<span class="arrow">⟶</span>
				<span class="c">{endAnswers?.[idx].toFixed(1) || ''}</span>
			</div>
		</li>
	{/each}
</ol>

<style>
	ol {
		display: none;
		padding: 0 1.4em;
		width: var(--width-large);
	}
	ol li {
		margin-bottom: 1em;
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
	}
	ol li:first-child {
		font-family: 'Instrument Serif', serif;
		font-size: 24px;
	}
	.index {
		margin-right: 2px;
	}
	.results {
		display: flex;
		gap: 2px;
		align-items: center;
	}
	.arrow,
	.s,
	.c {
		display: block;
		width: 30px;
		text-align: center;
	}
	.arrow {
		font-size: 1rem;
		width: 50px;
	}
	@media screen and (min-width: 900px) {
		.mobile {
			display: none;
		}
		ol {
			display: block;
		}
	}
</style>
