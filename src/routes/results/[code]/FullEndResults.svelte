<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import SpiderChart from '$lib/components/SpiderChart.svelte';
	import { _sendShiftsEmail } from './+page';
	import Modal from '$lib/components/Modal.svelte';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';
	import trackEvent from '$lib/custom-event';
	import { enhance } from '$app/forms';
	import DynamicsComparison from '$lib/components/DynamicsComparison.svelte';
	import cloudBg from '$lib/assets/cloud-bg.jpg';

	const BREAKPOINT = 900;
	let innerWidth = $state(500);
	let { data } = $props();
	let highlight = $state(0);
	let chartWidth = $state(100);
	let chartWidthUpNext = $state(100);

	// Email form & query state management
	let email = $state('');
	let showEmailModal = $state<boolean>(false);
	let sendEmailLoading = $state<boolean>(false);
	let sendEmailFinished = $state<boolean>(false);
	let sendEmailSuccess = $state<boolean>(false);
	let emailError = $state<string>('');

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
			<h1 class="title modal-title">Email Your Shifts</h1>
			<p>
				Email yourself a link to your starting and ending “webs,” so you can reference your shifts
				anytime.
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
						const resp = await _sendShiftsEmail(email, data.resultCode);
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
				<h1 class="title">Your 8 Dynamics Shifts</h1>
			</div>
			<div class="side-by-side">
				<div class="chart fade-in delayed" aria-hidden="true" bind:clientWidth={chartWidth}>
					<h2 class="uppercase-title">Starting Point</h2>
					<SpiderChart
						answers={data.start?.object}
						{highlight}
						{chartWidth}
						isStart={true}
						skipHover={true}
						showHighlight={innerWidth < BREAKPOINT}
					/>
				</div>
				<div
					class="chart fade-in delayed"
					style="animation-delay: 1.5s;"
					aria-hidden="true"
					bind:clientWidth={chartWidth}
				>
					<h2 class="uppercase-title">Ending Point</h2>
					<SpiderChart
						answers={data.current?.object}
						{highlight}
						{chartWidth}
						isStart={false}
						skipHover={true}
						showHighlight={innerWidth < BREAKPOINT}
					/>
				</div>
			</div>
			<div class="reflect">
				<div class="column fade-in" style="animation-delay: 2.5s;">
					<p>
						Compare where you started this journey and where you find yourself now. Notice: <i
							>What’s shifted? Where have you grown? Where would you like to grow further, with
							intention?</i
						>
					</p>

					<div class="fade-in" style="animation-delay: 3.5s; margin-top: 20px;">
						<button onclick={() => (showEmailModal = true)} class="btn primary"
							>Email Your Shifts</button
						>
					</div>
				</div>
			</div>
		</section>
		<section class="nums-wrapper">
			<div class="results fade-in">
				<DynamicsComparison
					{highlight}
					startAnswers={data.start?.answers.map((a) => a.value)}
					endAnswers={data.current?.answers.map((a) => a.value)}
					onLeave={() => null}
				/>
			</div>
		</section>
		<!-- <section class="up-next">
			<div class="charts-overlaid">
				<div class="charts" bind:clientWidth={chartWidthUpNext}>
					<div class="absolute-wrapper">
						<SpiderChart
							answers={data.current?.object}
							startAnswers={data.start?.object}
							{highlight}
							chartWidth={chartWidthUpNext}
							skipHover={true}
							isOverlay={true}
						/>
					</div>
					<SpiderChart
						answers={data.start?.object}
						{highlight}
						chartWidth={chartWidthUpNext}
						onLeave={() => null}
						skipHover={true}
						isOverlay={true}
						isStart={true}
					/>
				</div>
				<div class="text">
					<div class="uppercase-title">Your Biggest Shift</div>
					<h2 class="title">Example Dynamic</h2>
					<p>Todo: Confirm with AWCS team on content for this section.</p>
				</div>
			</div>
		</section> -->
		<section class="conclusion">
			<div class="column">
				<a class="fancy-link" href="/">Close</a>
			</div>
		</section>
	</main>
</div>

<style>
	.intro {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.outer {
		background-color: var(--cloud);
		min-height: 100vh;
		min-height: 100dvh;
		box-sizing: border-box;
	}
	.cloud-bg {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
	}
	.title {
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.clouds {
		position: relative;
		padding: 20px 20px;
		padding-top: 0px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
	}
	.side-by-side {
		display: flex;
		justify-content: center;
		gap: 40px;
		margin: 40px 0px;
	}
	.reflect {
		display: flex;
		justify-content: center;
	}
	.reflect .column {
		margin: 20px;
	}
	.chart {
		flex: 1;
		width: 560px;
		max-width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	h2 {
		margin-bottom: 40px;
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
		max-width: 100%;
	}

	.charts {
		/* width: 50%; */
		/* width: 500px; */
		/* max-width: 100%; */
		width: 500px;
		max-width: 100%;
		flex: 1;
		position: relative;
	}

	.text {
		flex: 1;
		padding: 20px;
	}

	/* .text h2 {
		font-family: 'Instrument Serif', serif;
		font-size: 32px;
	} */

	.text p {
		font-size: 1rem;
	}

	.absolute-wrapper {
		position: absolute;
		top: 0px;
		left: 0px;
	}

	.nums-wrapper {
		padding: 40px 0px;
		background-color: var(--periwinkle);
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
		width: 1000px;
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

	@media screen and (max-width: 1180px) {
		.chart {
			max-width: 500px;
		}
	}

	@media screen and (max-width: 1000px) {
		.chart {
			max-width: 400px;
		}
	}

	@media screen and (max-width: 800px) {
		.side-by-side {
			flex-direction: column;
			gap: 60px;
			align-items: center;
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
		.chart {
			width: 100%;
		}
		.charts {
			width: 100%;
		}
	}
</style>
