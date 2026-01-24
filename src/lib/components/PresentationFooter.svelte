<script>
	import { FACILITATOR } from '$lib/constants';

	let {
		num = null,
		numLabel = null,
		helper = null,
		onNext = null,
		nextLabel = null,
		onPrev = null,
		skipPrev = false,
		role = null
	} = $props();
</script>

<footer>
	<div class="buttons-wrapper">
		<!-- Skip helper text for facilitators (they will be trained) -->
		{#if helper && role !== FACILITATOR}
			<pre class="helper">{helper}</pre>
		{/if}
		<div class="buttons">
			{#if !skipPrev}
				<button onclick={onPrev} disabled={!onPrev}>
					<span class="visually-hidden">Previous</span>
					<span aria-hidden="true">←</span>
				</button>
			{/if}
			<button class="next" onclick={onNext} disabled={!onNext}>
				{nextLabel}
				{#if !(nextLabel.includes('End') || nextLabel.includes('Close'))}
					<span aria-hidden="true">→</span>
				{/if}
			</button>
		</div>
	</div>
	{#if numLabel}
		<div class="ready">
			{numLabel}
			<div><span>{num}</span></div>
		</div>
	{/if}
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0px;
		left: 0px;
		display: flex;
		padding: 40px;
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
		min-width: 48px;
		height: 48px;
		background-color: var(--cloud);
		border-radius: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		border: 1px solid var(--onyx);
		gap: 12px;
		padding: 0px 16px;
		box-sizing: border-box;
	}
	button span {
		font-size: 2rem;
		margin: 0px -5px;
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
		background-color: var(--periwinkle);
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ready div span {
		position: relative;
		top: 2px;
		font-size: 20px;
	}
	.helper {
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		line-height: 24px;
		font-size: 15px;
		opacity: 0.9;
	}
</style>
