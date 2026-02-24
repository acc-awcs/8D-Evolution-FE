<script lang="ts">
	import dynamics, { rotateDynamic } from '$lib/dynamics';
	import LongArrow from './LongArrow.svelte';

	let {
		highlight = 0,
		startAnswers,
		endAnswers,
		onHover,
		onLeave
	}: {
		highlight: number;
		startAnswers: string[];
		endAnswers: string[];
		onHover: CallableFunction;
		onLeave: CallableFunction;
	} = $props();

	function onArrowClick(delta: number) {
		const selected = rotateDynamic(highlight, delta);
		onHover(selected);
	}
</script>

<ol>
	<li>
		<div class="uppercase-title">Your 8 Dynamics Shifts</div>
		<div class="labels">
			<span class="s">Starting Point</span>
			<span class="e">Ending Point</span>
		</div>
		<!-- <span class="visually-hidden">Your Shift: {startAnswers[idx]} to {endAnswers[highlight]}</span> -->
	</li>
	{#each dynamics as dynamic, idx}
		<li>
			<div class="dynamic">
				<span class="index">{idx + 1}.</span>
				{dynamic.full}
			</div>
			<div class="results">
				<span class="start-num">{startAnswers[idx]}</span>
				<span class="arrow"><LongArrow /></span>
				<span class="end-num">{endAnswers[idx]}</span>
			</div>
			<!-- <span class="visually-hidden">Your Shift: {startAnswers[idx]} to {endAnswers[highlight]}</span> -->
		</li>
	{/each}
</ol>

<style>
	ol {
		display: block;
		padding: 0px 20px;
		width: 1200px;
		max-width: 100%;
		padding-bottom: 40px;
		box-sizing: border-box;
	}
	ol li {
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
		gap: 80px;
	}
	ol li:first-child {
		/* font-family: 'Instrument Serif', serif; */
		font-size: 16px;
		margin-bottom: 26px;
	}
	.index {
		margin-right: 2px;
	}
	.results {
		max-width: 100%;
		width: 300px;
		display: flex;
		gap: 2px;
		align-items: center;
		justify-content: space-between;
	}

	.labels {
		max-width: 100%;
		display: flex;
		gap: 10px;
		justify-content: space-between;
		width: 300px;
	}

	.start-num,
	.end-num {
		font-size: 26px;
	}

	.start-num {
		padding-left: 40px;
	}

	.end-num {
		padding-right: 40px;
	}

	.dynamic {
		padding: 26px 0px;
		flex: 1;
		border-top: 1px solid var(--onyx);
	}

	li:last-of-type .dynamic {
		border-bottom: 1px solid var(--onyx);
	}

	@media screen and (max-width: 900px) {
		ol li {
			flex-direction: column;
			gap: 0px;
			padding-bottom: 26px;
			border-bottom: 1px solid var(--onyx);
		}
		ol li:first-child {
			margin-bottom: 0px;
		}
		.start-num,
		.end-num {
			padding: 0px;
		}
		.labels {
			display: none;
		}
		.dynamic {
			border: none;
		}
		li:last-of-type .dynamic {
			border: none;
		}
	}
</style>
