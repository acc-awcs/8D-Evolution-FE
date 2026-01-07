<script>
	import Logo from '$lib/components/Logo.svelte';
	import accountIcon from '$lib/assets/account.svg';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';
	import { GROUP_LEAD } from '$lib/constants.js';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';

	let loading = $state(false);
	let accountModalOpen = $state(false);
	const closeModal = () => (accountModalOpen = false);
	let { data, children } = $props();
</script>

<div class="wrapper">
	<nav>
		<Logo relative={true} />
		<div class="home-label">Admin Dashboard</div>
		<div class="account-wrapper">
			<button class="account-btn" type="button" onclick={() => (accountModalOpen = true)}>
				<span class="visually-hidden">Account</span>
				<img src={accountIcon} alt="" />
			</button>
		</div>
	</nav>

	{#if accountModalOpen}
		<Modal handleClose={closeModal}>
			<div class="header">
				<h1 class="title small">Account</h1>
				<button onclick={closeModal} class="close link-like" type="button">Close</button>
			</div>
			{#if data.role === GROUP_LEAD}
				<p>Logged in as {data.email}.</p>
			{:else}
				<p>Logged in as {data.firstName} {data.lastName} ({data.email}).</p>
			{/if}
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ result, update }) => {
						await update();
						loading = false;
					};
				}}
				action="/api/logout?/adminLogout"
			>
				<button class="btn primary large" type="submit" disabled={loading} class:loading>
					{#if loading}
						<ButtonLoader />
					{:else}
						Logout <svg viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
							<path d="M34.1477 1.39111L41.9321 9.17551L34.1477 16.9599"></path>
							<path d="M1.19088 9.16982H40.6755"></path>
						</svg>
					{/if}
				</button>
			</form>
		</Modal>
	{/if}

	<main>
		{@render children()}
	</main>
</div>

<style>
	.home-label {
		font-family: 'Instrument Serif', serif;
		/* text-transform: uppercase; */
		font-size: 26px;
		margin-top: 6px;
	}
	.wrapper {
		/* background-color: var(--cloud-dark); */
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: space-around;
		justify-content: flex-start;
	}

	nav {
		display: flex;
		justify-content: space-between;
		padding: 16px;
		align-items: flex-start;
		border-bottom: 1px solid var(--onyx);
		background-color: var(--cloud);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.close {
		margin-top: 15px;
	}

	.account-btn {
		padding: 0px;
		background-color: transparent;
		border: none;
		border-radius: 100%;
		margin: 0px;
		height: auto;
		opacity: 1;
		transition: opacity 0.1s linear;
	}

	.account-btn img {
		display: block;
	}

	.account-btn:hover {
		opacity: 0.9;
	}

	.account-wrapper {
		/* width: 100px; */
		display: flex;
		justify-content: flex-end;
	}

	.btn {
		display: flex;
		justify-content: center;
		gap: 20px;
		align-items: center;
		min-width: 150px;
	}

	svg {
		position: relative;
		display: block;
		/* margin: 0 auto; */
		width: 30px;
		height: 20px;
		margin-bottom: 4px;
	}

	path {
		stroke: var(--onyx);
		stroke-width: 2px;
		stroke-linejoin: round;
		stroke-linecap: round;
		fill: none;
	}

	main {
		width: 1300px;
		max-width: 100%;
		align-self: center;
		/* padding: 20px; */
		box-sizing: border-box;
		min-height: 85vh;
		margin-top: 10px;
		border-radius: var(--br);
	}

	@media screen and (max-width: 600px) {
		main {
			padding: 20px 20px;
		}
	}
</style>
