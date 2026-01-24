<script lang="ts">
	import LogoSvg from './LogoSvg.svelte';

	export const { onDark = false, relative = false, liveLink = false } = $props();
</script>

<div class:relative>
	{#if liveLink}
		<a href="https://climatewayfinding.earth" aria-label="Climate Wayfinding">
			<LogoSvg {onDark} />
		</a>
	{:else}
		<LogoSvg {onDark} />
	{/if}
</div>

<style>
	div {
		display: block;
		position: absolute;
		left: 30;
		top: 30;
		padding: 20px;
		z-index: 10;
	}
	div.relative {
		display: block;
		position: relative;
		left: 0;
		top: 0;
		padding: 0px;
	}
</style>
