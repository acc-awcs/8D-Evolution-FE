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
	import DynamicsComparison from '$lib/components/DynamicsComparison.svelte';

	const INTERVAL = 1500;
	const BREAKPOINT = 900;
	let innerWidth = $state(500);
	let { data } = $props();
	let highlight = $state(0);
	let intervalId = $state<number>();
	let chartWidth = $state(100);

	// Email form & query state management
	let email = $state('');
	let showEmailModal = $state<boolean>(false);
	let sendEmailLoading = $state<boolean>(false);
	let sendEmailFinished = $state<boolean>(false);
	let sendEmailSuccess = $state<boolean>(false);
	let emailError = $state<string>('');

	function startRotate() {
		// if (innerWidth < BREAKPOINT) {
		// 	// If the screen is mobile width, we don't want to automatically highlight the dynamics
		// 	return;
		// }
		// if (!intervalId) {
		// 	intervalId = setInterval(() => {
		// 		highlight = rotateDynamic(highlight, 1);
		// 	}, INTERVAL);
		// }
	}
	function stopRotate() {
		clearInterval(intervalId);
		intervalId = undefined;
	}

	function onHover(select: number) {
		highlight = select;
		// stopRotate();
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
			<h1 class="title modal-title">Email Your Code</h1>
			<p>
				We'll send you an email with your results code for safekeeping. We'll also include a link to
				return to these results. Your email will not be stored.
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
				<label class="visually-hidden" for="email">Your email address</label>
				<input
					value={email}
					type="text"
					oninput={handleEmailChange}
					placeholder="Your email address"
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
			<h1 class="title">Email sent</h1>
			<p>Your email is on its way! Check your inbox for your results link.</p>
			<div class="buttons done">
				<button class="btn primary" onclick={closeModal}>Done</button>
			</div>
		{:else}
			<h1 class="title">Need MailChimp Auth</h1>
			<p>
				Emi here - I'll need to grab the MailChimp API key from Amy (we can find this together!)
			</p>
			<div class="buttons done">
				<button class="btn primary" onclick={closeModal}>Done</button>
			</div>
			<!-- Error message -->
			<!-- <h1 class="title">Oops!</h1>
			<p>
				Looks like something went wrong on our end and we couldn't send your email. Please try again
				later.
			</p>
			<div class="buttons done">
				<button class="btn primary" onclick={closeModal}>Done</button>
			</div> -->
		{/if}
	</Modal>
{/if}

<div class="outer">
	<header class="logo">
		<Logo />
	</header>
	<main>
		<section class="clouds">
			<div class="intro fade-in">
				<!-- <a onclick={() => trackEvent('click_retake_quiz')} href="/">← Retake the Quiz</a> -->
				<h1 class="title">Your 8 Dynamics Shift</h1>
			</div>
			<div class="side-by-side">
				<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={chartWidth}>
					<h2>Start</h2>
					<SpiderChart
						answers={data.start?.object}
						{highlight}
						{chartWidth}
						{onHover}
						isStart={true}
						onLeave={startRotate}
						skipHover={true}
						showHighlight={innerWidth < BREAKPOINT}
					/>
				</div>
				<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={chartWidth}>
					<h2>End</h2>
					<SpiderChart
						answers={data.current?.object}
						{highlight}
						{chartWidth}
						{onHover}
						onLeave={startRotate}
						skipHover={true}
						showHighlight={innerWidth < BREAKPOINT}
					/>
				</div>
			</div>
			<div class="results fade-in">
				<DynamicsComparison
					{highlight}
					startAnswers={data.start?.answers.map((a) => a.value)}
					endAnswers={data.current?.answers.map((a) => a.value)}
					{onHover}
					onLeave={startRotate}
				/>
			</div>
		</section>
		<section class="up-next">
			<div class="charts-overlaid">
				<!-- Overlaid version -->
				<div class="charts">
					<div class="absolute-wrapper">
						<SpiderChart
							answers={data.start?.object}
							{highlight}
							{chartWidth}
							{onHover}
							onLeave={startRotate}
							skipHover={true}
							isOverlay={true}
							isStart={true}
						/>
					</div>
					<SpiderChart
						answers={data.current?.object}
						startAnswers={data.start?.object}
						{highlight}
						{chartWidth}
						{onHover}
						onLeave={startRotate}
						skipHover={true}
						isOverlay={true}
					/>
				</div>
				<div class="text">
					<h2>Next Steps</h2>
					<p>
						Let me know whatever you want to be called out here! Can be a statistical insight on
						their results, opportunities for further progress, etc.
					</p>
					<p>I can also remove the animation on the chart here and just do a static overlay.</p>
				</div>
			</div>
		</section>
		<section class="conclusion">
			<div class="column">
				<a class="fancy-link" href="/">← Return to Start</a>
			</div>
		</section>
	</main>
	<!-- <footer>
		© 2024 The All We Can Save Project. Developers <a
			href="https://github.com/chelshaw"
			target="_blank"
			rel="noopener nofollow">Chelsea Shaw</a
		>,
		<a href="https://github.com/emikjackson" target="_blank" rel="noopener nofollow">Emi Jackson</a
		>, and
		<a href="https://www.linkedin.com/in/li-helen" target="_blank" rel="noopener nofollow"
			>Helen Li</a
		> brought this interactive tool to life.
	</footer> -->
</div>

<style>
	.intro {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.outer {
		background-color: var(--periwinkle);
		min-height: 100vh;
		box-sizing: border-box;
	}
	.clouds {
		background-color: var(--periwinkle);
		background-image:
			url('$lib/assets/cloud-1.png'), url('$lib/assets/cloud-4.png'), url('$lib/assets/cloud-5.png');
		background-repeat: no-repeat, no-repeat, no-repeat;
		background-blend-mode: overlay, overlay, overlay;
		background-position:
			bottom left,
			bottom 0 right -100px,
			bottom right;
		/* background-size: 485px, 504px, 503px; */
		background-size: 1000px, 1000px, 1000px;
		position: relative;
		padding: 20px 20px;
		padding-bottom: 40px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
	}
	.side-by-side {
		display: flex;
		justify-content: center;
		gap: 100px;
		margin: 40px 0px;
	}
	.chart {
		flex: 1;
		max-width: 500px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	h2 {
		font-family: 'Instrument Serif', serif;
	}
	.logo {
		height: 120px;
		position: relative;
	}
	.intro {
		margin: 0px 20px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.results {
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
	h1 {
		margin: 0;
		padding: 0;
		margin-top: 30px;
		margin-bottom: 40px;
	}

	.charts-overlaid {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 80px;
		width: 1000px;
	}

	.charts {
		/* width: 50%; */
		position: relative;
	}

	.text {
		padding: 20px;
	}

	.text h2 {
		font-family: 'Instrument Serif', serif;
		font-size: 32px;
	}

	.text p {
		font-size: 1rem;
	}

	.absolute-wrapper {
		position: absolute;
		top: 0px;
		left: 0px;
	}

	.pre-title {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 26px;
		line-height: 1.4;
		margin: 0;
	}

	.up-next {
		display: flex;
		justify-content: center;
		background-color: var(--cloud);
		padding: 60px 20px;
	}

	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: var(--width-large);
		text-align: center;
		max-width: 100%;
		margin: 40px 0px;
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

	.fade-in {
		transition: all 2s linear;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 2s ease 0s 1 forwards;
	}

	.delayed {
		animation-delay: 0.5s;
	}

	.conclusion {
		background-color: var(--periwinkle);
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

	@media screen and (min-width: 900px) {
		.clouds {
			padding: 20px 60px;
			padding-bottom: 80px;
		}
		h1 {
			margin-bottom: 0px;
		}
		.intro {
			margin: 0px;
		}
	}

	@media screen and (max-width: 800px) {
		.side-by-side {
			flex-direction: column;
			gap: 60px;
		}
		.charts-overlaid {
			flex-direction: column;
		}
	}

	@media screen and (max-width: 400px) {
		.clouds {
			padding: 10px;
			padding-bottom: 20px;
		}
	}
</style>
