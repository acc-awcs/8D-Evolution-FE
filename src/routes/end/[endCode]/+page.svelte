<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { _checkStartCode } from './+page';

	let { data } = $props();

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
		if (/^[a-zA-Z0-9]+$/.test(input.value) && input.value.length <= 6) {
			code = input.value;
		}
	}
</script>

<div class="wrapper static-fade-in">
	<header class="logo">
		<Logo relative={true} />
	</header>
	<main>
		<section>
			<div class="column">
				<h1 class="title large">Map Your Shifts</h1>
				<p>
					To compare where you started and where you are now, enter the code you received at the
					beginning of your Climate Wayfinding journey.
				</p>
				<p>
					If you emailed it to yourself, search for the subject line “Climate Wayfinding: Your 8
					Dynamics Code.” You may also have it saved in a password manager or jotted down in your
					journal.
				</p>
				{#if codeError.length > 0}
					<div class="error-wrapper">
						<p class="error">{codeError}</p>
					</div>
				{/if}
				<form
					onsubmit={async (e) => {
						if (code === '' || code.length < 6) {
							codeError = 'Please enter a six-letter code';
							return;
						}
						codeCheckLoading = true;
						const resp = await _checkStartCode(code, data.endCode);
						if (resp.success) {
							goto(`/results/${data.endCode}`);
						} else if (resp.notFound) {
							codeError =
								'We couldn’t find a starting point entry with that code. Please double check your entry.';
						} else {
							codeError =
								'Having trouble identifying that code, please refresh your page and try again.';
						}
						codeCheckLoading = false;
					}}
				>
					<label
						><span>Your Unique Code</span>
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
					Don’t have the code? Unfortunately, we won’t be able to map your shifts without it.
				</p>
			</div>
		</section>
	</main>
</div>

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
	.logo {
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
		/* background-image:
			url('$lib/assets/cloud-1.png'), url('$lib/assets/cloud-4.png'), url('$lib/assets/cloud-5.png');
		background-repeat: no-repeat, no-repeat, no-repeat;
		background-blend-mode: overlay, overlay, overlay;
		background-position:
			bottom left,
			bottom 0 right -100px,
			bottom right;
		background-size: 485px, 504px, 503px; */
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
