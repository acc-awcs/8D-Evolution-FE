<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';

	// Code form & state management
	let code = $state('');
	let codeCheckLoading = $state<boolean>(false);
	let codeError = $state<string>('');

	function preventExtensiveLength(event: KeyboardEvent) {
		// Allow deleting and navigating
		if (
			event.key === 'Backspace' ||
			event.key === 'Delete' ||
			event.key === 'Tab' ||
			event.key.startsWith('Arrow') ||
			event.ctrlKey ||
			event.metaKey
		) {
			return;
		}
		if (event.target?.value?.length > 5) {
			if (event.key !== 'Enter') {
				event.preventDefault(); // Stop the character from being entered
			}
		}
	}

	function handleCodeInputChange(evt: Event): void {
		const input = evt.target as HTMLInputElement;
		// 		if (/^[0-9]+$/.test(input.value) && input.value.length <= 6) {
		// 	code = input.value;
		// }
		if (/^[a-zA-Z0-9]+$/.test(input.value) && input.value.length <= 6) {
			code = input.value;
		}
	}

	const handleContinue = $derived(() => {
		goto(`/end/${code}`);
	});
</script>

{#if codeError.length > 0}
	<div class="error-wrapper">
		<p class="error">{codeError}</p>
	</div>
{/if}
<!-- 
	onsubmit={async (e) => {
		if (code === '' || code.length < 6) {
			codeError = 'Please enter a six-letter code';
			return;
		}
		codeCheckLoading = true;
		const resp = await _checkStartCode(code);
		if (resp.success) {
			if (resp.redirectCode) {
				goto(`/results/${resp.redirectCode}`);
			} else {
				goto(`/end/${code}`);
			}
		} else if (resp.notFound) {
			codeError =
				"We couldn't find a starting point entry with that code. Please double check your entry.";
		} else {
			codeError = 'Having trouble identifying that code, please refresh your page and try again.';
		}
		codeCheckLoading = false;
	}} -->
<form
	method="POST"
	use:enhance={(data) => {
		codeCheckLoading = true;
		return async ({ result, update }) => {
			await update();
		};
	}}
	action={`/api/check-start?/checkStartCode`}
>
	<label
		><span>Your Starting Point Code</span>
		<input
			value={code}
			type="text"
			placeholder="______"
			oninput={handleCodeInputChange}
			onkeydown={preventExtensiveLength}
			id="code"
		/>
	</label>
	<div class="buttons">
		<button
			class="btn quaternary"
			class:loading={codeCheckLoading}
			type="submit"
			disabled={codeCheckLoading}
		>
			{#if codeCheckLoading}
				<ButtonLoader />
			{:else}
				Submit
			{/if}
		</button>
	</div>
</form>

<p class="note">
	Don't have the code? No worries, although you won't be able to compare your results, you can still
	take the quiz! <a href="/end/skipstart">Skip to Quiz</a>
</p>

<style>
	.error-wrapper {
		display: flex;
		justify-content: center;
	}
	.error {
		display: inline-block;
		background-color: var(--cloud-faded);
		padding: 4px 16px;
		border-radius: var(--br);
		padding-top: 6px;
		margin: 0px;
	}

	button {
		min-width: 200px;
	}
	/* .logo {
		position: relative;
		margin-bottom: 40px;
		display: flex;
		justify-content: center;
	}
	.wrapper {
		background-color: var(--periwinkle);
		min-height: 100vh;
		min-height: 100dvh;
		box-sizing: border-box;
		background-color: var(--periwinkle);
		background-image:
			url('$lib/assets/cloud-1.png'), url('$lib/assets/cloud-4.png'), url('$lib/assets/cloud-5.png');
		background-repeat: no-repeat, no-repeat, no-repeat;
		background-blend-mode: overlay, overlay, overlay;
		background-position:
			bottom left,
			bottom 0 right -100px,
			bottom right;
		background-size: 485px, 504px, 503px;
		padding: 20px 20px;
	}

	section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 60vh;
	}

	.column {
		display: flex;
		width: var(--width-medium);
		justify-content: center;
		text-align: center;
		flex-direction: column;
	}

	.column p {
		font-size: 1rem;
	} */

	label {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label > span {
		margin-top: 20px;
		display: block;
		margin-bottom: 10px;
		font-size: 1rem;
	}

	input {
		padding: 10px;
		padding-top: 16px;
		width: 300px;
		font-size: 2.5rem;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		font-weight: 200;
		color: var(--onyx);
		background-color: var(--cloud);
		border-radius: 10px;
		border: none;
		cursor: pointer;
		letter-spacing: 10px;
		text-align: center;
		margin-bottom: 20px;
		text-transform: uppercase;
	}

	form {
		margin-bottom: 40px;
	}

	.note {
		font-style: italic;
	}
</style>
