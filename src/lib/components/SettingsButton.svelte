<script>
	let { onClick } = $props();
</script>

<button onclick={onClick}>
	<span class="visually-hidden"> Settings </span>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		aria-hidden="true"
		><path
			fill="currentColor"
			d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
		/></svg
	>
</button>

<style>
	button {
		padding: 0px;
		background-color: transparent;
		border: none;
		border-radius: 100%;
		margin: 0px;
		height: auto;
		opacity: 1;
		transition: opacity 0.1s linear;
	}

	button:hover {
		opacity: 0.9;
	}
</style>
