<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import { _getPoll } from './+page';

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
			event.preventDefault(); // Stop the character from being entered
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

<h1 class="title">8 Dynamics Collective Poll</h1>
<p>Enter the six-digit number provided by your facilitator:</p>
{#if codeError.length > 0}
	<p class="error">{codeError}</p>
{/if}
<form
	onsubmit={async (e) => {
		if (code === '' || code.length < 6) {
			codeError = 'Please enter a six-digit code';
			return;
		}
		codeCheckLoading = true;
		const resp = await _getPoll(code);
		if (resp.success) {
			goto(`/poll/${code}`);
		} else if (resp.notFound) {
			codeError =
				"We couldn't find a matching entry with that code. Please double check your entry.";
		} else {
			codeError = 'Having trouble identifying that code, please refresh your page and try again.';
		}
		codeCheckLoading = false;
	}}
>
	<label
		><span class="visually-hidden">Your Starting Point Code</span>
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
			class="btn primary"
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

<style>
	button {
		min-width: 200px;
	}

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
		background-color: var(--cloud-dark);
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
</style>
