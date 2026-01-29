<script>
	import glyph from '$lib/assets/wayfinding/blank-glyph.png';
	import SpiderChart from '$lib/components/SpiderChart.svelte';

	let chartWidth = $state(500);
	let { data } = $props();
</script>

<div class="wrapper">
	<img src={glyph} alt="" />

	<h1 class="title">Your 8 Dynamics Web</h1>
	<!-- <Spi -->

	<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={chartWidth}>
		<SpiderChart answers={data.current?.object} {chartWidth} isStart={true} />
	</div>

	<p>Here's the 8 Dynamics web from your individual submission.</p>

	<p>
		Shift your attention to the presentation to see the averaged results for your group come in.
	</p>
</div>

<style>
	img {
		margin-top: 12px;
		width: 91px;
		height: 91px;
	}
	h1 {
		margin: 40px 0px;
	}
	p {
		margin: 0px;
		margin-bottom: 12px;
	}
	.wrapper {
		max-width: 100%;
		margin: 60px 0px;
	}
</style>
