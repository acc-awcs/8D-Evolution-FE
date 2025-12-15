<script lang="ts">
</script>

<main class="wrapper">
	<div class="tile">
		<slot />
	</div>
</main>

<style>
	.wrapper {
		display: flex;
		min-height: 100vh;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		background-color: var(--periwinkle);
		justify-content: center;
		align-items: center;
	}

	.tile {
		padding: 28px;
		background-color: var(--cloud);
		border-radius: var(--br);
		width: var(--width-extra-small);
		max-width: 100%;
		box-sizing: border-box;
	}
</style>
