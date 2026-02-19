<script lang="ts">
	import DynamicSlider from '$lib/components/DynamicSlider.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { _sendEmail } from './+page';
	import { rotateDynamic } from '$lib/dynamics';
	import { onDestroy, onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import { prettyCode } from '$lib/helpers/results';
	import CopyBox from '$lib/components/CopyBox.svelte';
	import trackEvent from '$lib/custom-event';
	import { enhance } from '$app/forms';
	import cloudBg from '$lib/assets/cloud-bg.jpg';

	const INTERVAL = 1500;
	const BREAKPOINT = 900;
	let innerWidth = $state(500);
	let { data } = $props();
	let highlight = $state(0);
	let intervalId = $state<number>();
	let chartWidth = $state(500);

	// Email form & query state management
	let email = $state('');
	let showEmailModal = $state<boolean>(false);
	let sendEmailLoading = $state<boolean>(false);
	let sendEmailFinished = $state<boolean>(false);
	let sendEmailSuccess = $state<boolean>(false);
	let emailError = $state<string>('');

	function startRotate() {
		if (innerWidth < BREAKPOINT) {
			// If the screen is mobile width, we don't want to automatically highlight the dynamics
			return;
		}
		if (!intervalId) {
			intervalId = setInterval(() => {
				highlight = rotateDynamic(highlight, 1);
			}, INTERVAL);
		}
	}
	function stopRotate() {
		clearInterval(intervalId);
		intervalId = undefined;
	}

	function onHover(select: number) {
		highlight = select;
		stopRotate();
	}

	onMount(() => {
		startRotate();
	});
	onDestroy(() => {
		stopRotate();
	});

	function handleEmailChange(evt: Event): void {
		const input = evt.target as HTMLInputElement;
		email = input.value;
	}

	function openModal(): void {
		showEmailModal = true;
		trackEvent('click_email_prompt');
	}

	function closeModal(): void {
		email = '';
		emailError = '';
		sendEmailFinished = false;
		showEmailModal = false;
	}
</script>

<svelte:window bind:innerWidth />

{#if showEmailModal}
	<Modal handleClose={closeModal}>
		{#if !sendEmailFinished}
			<!-- Email form -->
			<h1 class="title modal-title">Email Code</h1>
			<p>
				We'll email you your code, along with a link to return to these results. Your email address
				will not be stored by The All We Can Save Project.
			</p>
			{#if emailError.length > 0}
				<p class="error">{emailError}</p>
			{/if}
			<form
				data-sveltekit-noscroll
				use:enhance
				onsubmit={async (e) => {
					if (email === '') {
						emailError = 'Please enter an email address';
					} else if (!sendEmailLoading) {
						sendEmailLoading = true;
						const resp = await _sendEmail(email, data.resultCode);
						sendEmailLoading = false;
						if (resp.invalidFormat) {
							emailError = 'Please enter a valid email';
						} else {
							sendEmailFinished = true;
							sendEmailSuccess = resp.success;
							email = '';
							trackEvent('click_email_send_success');
						}
					}
				}}
			>
				<label class="visually-hidden" for="email">Your Email Address</label>
				<input
					value={email}
					type="text"
					oninput={handleEmailChange}
					placeholder="Your Email Address"
					id="email"
				/>
				<div class="buttons">
					<button class="btn secondary" type="button" onclick={() => (showEmailModal = false)}
						>Cancel</button
					>
					<button
						class="btn primary"
						class:loading={sendEmailLoading}
						type="submit"
						disabled={sendEmailLoading}
					>
						{#if sendEmailLoading}
							<ButtonLoader />
						{:else}
							Send
						{/if}
					</button>
				</div>
			</form>
		{:else if sendEmailSuccess === true}
			<!-- Success message -->
			<h1 class="title">Email Sent</h1>
			<p>Your email is on its way!</p>
			<div class="buttons done">
				<button class="btn primary" onclick={closeModal}>Done</button>
			</div>
		{:else}
			<!-- Error message -->
			<h1 class="title">Oops!</h1>
			<p>
				Looks like something went wrong on our end and we couldn't send your email. Please try again
				later.
			</p>
			<div class="buttons done">
				<button class="btn primary" onclick={closeModal}>Done</button>
			</div>
		{/if}
	</Modal>
{/if}

<div class="outer">
	<img class="cloud-bg static-fade-in" src={cloudBg} alt="" />
	<header class="logo">
		<Logo liveLink={true} />
	</header>
	<main>
		<section class="clouds">
			<div class="intro fade-in">
				<p class="uppercase-title">Starting Point Assessment</p>
				<h1 class="title">Your 8 Dynamics Results</h1>
			</div>
			<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={chartWidth}>
				<SpiderChart
					answers={data.current?.object}
					{highlight}
					{chartWidth}
					{onHover}
					onLeave={startRotate}
					isStart={true}
				/>
			</div>
			<div class="results fade-in">
				<DynamicSlider
					{highlight}
					answers={data.current?.answers.map((a) => a.value)}
					{onHover}
					onLeave={startRotate}
				/>
				<p class="fade-in extra-delayed"><a href="#up_next">Scroll down for next steps ↓</a></p>
			</div>
		</section>
		<section id="up_next" class="up-next">
			<div class="column">
				<p class="pre-title">Next Steps</p>
				<h1 class="title large">Save Your Results</h1>
				<div class="instructions">
					<p>
						At the end of your <i>Climate Wayfinding</i> journey, you'll return to your starting "web"
						and reflect on how your 8 Dynamics have shifted.
					</p>
					<p>
						Your unique code lets you revisit this web anytime. Be sure to save it somewhere easy to
						access — perhaps in a password manager or a favorite journal.
					</p>
					<p>
						The simplest and safest way to store your code is to click the button below and email it
						to yourself.
					</p>
				</div>
				<button onclick={() => (showEmailModal = true)} class="btn quaternary">Email My Code</button
				>
				<label>
					<span>Your Unique Code</span>
					<CopyBox text={prettyCode(data.resultCode)} textToCopy={data.resultCode} />
				</label>
			</div>
		</section>
		<section class="conclusion">
			<div class="column">
				<a class="fancy-link" href="/">← Return to Start</a>
			</div>
		</section>
	</main>
</div>

<style>
	.outer {
		background-color: var(--cloud);
		min-height: 100vh;
		min-height: 100dvh;
		box-sizing: border-box;
		position: relative;
	}
	.cloud-bg {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
	}
	.clouds {
		/* background-color: var(--cloud); */
		position: relative;
		grid-template-columns: 1fr minmax(400px, 1fr);
		grid-template-rows: 1fr 2fr;
		gap: 1em 3em;
		padding: 0px 20px;
		padding-bottom: 40px;
		box-sizing: border-box;
	}
	.logo {
		height: 100px;
		position: relative;
		display: flex;
		justify-content: center;
	}
	.intro {
		margin: 0px 20px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.chart {
		grid-column-start: 2;
		grid-column-end: span 1;
		grid-row-start: 1;
		grid-row-end: span 2;
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h1 {
		margin: 0;
		padding: 0;
		margin-top: 30px;
		margin-bottom: 40px;
	}

	.up-next {
		display: flex;
		justify-content: center;
		background-color: var(--periwinkle);
		padding: 60px 20px;
	}

	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: var(--width-medium);
		text-align: center;
		max-width: 100%;
		margin: 40px 0px;
	}

	.instructions {
		margin: 20px 0px;
	}

	.instructions p {
		font-size: 1rem;
	}

	.up-next .btn {
		margin-bottom: 30px;
	}

	.buttons {
		width: 100%;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.buttons .btn {
		width: 100%;
	}

	.buttons.done .btn {
		margin-top: 10px;
		width: 70%;
	}

	.modal-title {
		margin-bottom: 20px;
	}

	.results {
		margin-top: 30px;
	}

	.fade-in {
		transition: all 2s linear;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 2s ease 0s 1 forwards;
	}

	.delayed {
		animation-delay: 0.5s;
		animation-duration: 3s;
	}

	.extra-delayed {
		margin-top: 40px;
		animation-delay: 1.5s;
		text-align: center;
	}

	.conclusion {
		background-color: var(--soil);
		padding: 40px;
		display: flex;
		justify-content: center;
	}

	.fancy-link {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 26px;
		line-height: 1.4;
		margin: 0;
		color: var(--onyx);
		text-decoration: none;
	}

	.fancy-link:hover {
		text-decoration: underline;
	}

	label {
		max-width: 100%;
	}

	label > span {
		display: block;
		margin-bottom: 10px;
		font-size: 1rem;
		color: #333;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}

		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	.uppercase-title {
		text-align: center;
	}
	.title {
		text-align: center;
	}

	@media screen and (min-width: 900px) {
		.uppercase-title {
			text-align: left;
		}
		.title {
			text-align: left;
		}
		.clouds {
			display: grid;
			padding: 20px 60px;
			padding-bottom: 80px;
		}
		h1 {
			margin-bottom: 0px;
		}
		.intro {
			margin: 0px;
		}
		.extra-delayed {
			text-align: left;
		}
	}

	@media screen and (max-width: 400px) {
		.clouds {
			padding: 10px;
			padding-bottom: 20px;
		}
	}
</style>
