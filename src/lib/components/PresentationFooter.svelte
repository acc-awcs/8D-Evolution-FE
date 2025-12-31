<script>
	let { num, numLabel, onNext, onPrev } = $props();
</script>

<footer>
	<div class="buttons">
		<button onclick={onPrev} disabled={!onPrev}>
			<span class="visually-hidden">Previous</span>
			<span aria-hidden="true">←</span>
		</button>
		<button onclick={onNext} disabled={!onNext}>
			<span class="visually-hidden">Next</span>
			<span aria-hidden="true">→</span>
		</button>
	</div>
	<div class="ready">
		{numLabel}
		<div><span>{num}</span></div>
	</div>
</footer>

<style>
	footer {
		position: absolute;
		bottom: 0px;
		left: 0px;
		display: flex;
		padding: 20px;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		align-items: flex-end;
	}
	.buttons {
		display: flex;
		gap: 6px;
	}
	button {
		width: 48px;
		height: 48px;
		background-color: var(--cloud-dark);
		border-radius: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		border: 1px solid var(--onyx);
	}
	button:disabled {
		border: 1px solid var(--cloud-dark);
		cursor: auto;
	}
	.ready {
		display: flex;
		flex-direction: column;
		gap: 6px;
		align-items: center;
	}
	.ready div {
		width: 52px;
		height: 52px;
		background-color: var(--cloud-dark);
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
	.ready div span {
		position: relative;
		top: 3px;
	}
</style>
