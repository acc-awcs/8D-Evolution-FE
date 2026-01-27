<script lang="ts">
	import { delay } from '$lib/helpers/general';

	export const { text, textToCopy } = $props();

	const INIT_PROMPT = 'Click to Copy';
	const SUCCESS_PROMPT = 'Copied to Clipboard ✓';

	let promptText = $state(INIT_PROMPT);

	const copyToClipboard = async (str: string) => {
		try {
			await navigator.clipboard.writeText(str);
			promptText = SUCCESS_PROMPT;
			await delay(2000);
			promptText = INIT_PROMPT;
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};
</script>

<button onclick={() => copyToClipboard(textToCopy)}>
	{text}
	<span class="copy-note">{promptText}</span>
</button>

<style>
	button {
		padding: 30px 10px;
		padding-bottom: 12px;
		width: 300px;
		/* line-height: 50px; */
		/* line-height: 50px; */
		font-size: 2.5rem;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		font-weight: 200;
		color: var(--onyx);
		background-color: var(--cloud);
		border-radius: 10px;
		border: none;
		cursor: pointer;
		box-sizing: border-box;
		max-width: 100%;
	}

	button:hover {
		background-color: var(--cloud-light);
	}

	button:focus {
		outline: none;
	}

	button:focus-visible {
		outline: 4px solid var(--neon);
	}

	.copy-note {
		display: block;
		font-size: 1rem;
		/* font-style: italic; */
		margin-top: 10px;
		height: 20px;
	}
</style>
