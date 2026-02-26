<script>
	import cloudBg from '$lib/assets/cloud-bg.jpg';

	let { surveys, facilitatorView = false } = $props();
</script>

<div class="wrapper blue" class:survey={facilitatorView}>
	{#if facilitatorView}
		<p class="intro">Here’s how participants from your group answered the following prompt:</p>
		<h2 class="title prompt">“What did you gain from participating in this experience?”</h2>
	{/if}
	{#if surveys?.length > 0}
		<div class="responses">
			{#each surveys as surveyResponse, idx}
				<p class="response">
					“{surveyResponse.text}”<br />
					{#if !facilitatorView}
						<a href={`/admin/survey/${surveyResponse.resultCode}`}>View Ending Point</a>
					{/if}
				</p>
			{/each}
		</div>
		<img class="cloud-bg static-fade-in" src={cloudBg} alt="" />
	{:else}
		<p>No survey responses found for this facilitation.</p>
	{/if}
</div>

<style>
	.wrapper {
		margin-bottom: 80px;
		/* background-color: var(--cloud-light); */
		border: 1px solid var(--cloud-dark);
		border-radius: var(--br);
		padding: 12px;
		margin-left: -12px;
		margin-right: -12px;
		position: relative;
	}
	.wrapper.survey {
		margin-left: 0px;
		margin-right: 0px;
		margin-bottom: 20px;
	}
	.blue {
		/* width: 600px; */
		border: 1px solid var(--cloud-dark);
		background-color: var(--cloud);
		display: flex;
		justify-content: center;
		overflow: hidden;
		flex-direction: column;
	}
	.responses p {
		margin: 0px;
	}
	.responses {
		width: 900px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
		position: relative;
		z-index: 1;
		margin: 50px 0px;
		/* margin-top: 80px; */
	}
	h2.prompt {
		margin-top: 10px;
		position: relative;
		z-index: 1;
		align-self: center;
		text-align: center;
	}
	.intro {
		text-align: center;
		position: relative;
		align-self: center;
		z-index: 1;
		padding: 6px 12px;
		background-color: var(--cloud-faded-extra);
		border-radius: var(--br);
		opacity: 0.96;
	}
	.response {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 32px;
		line-height: 1.4;
		/* width: 500px; */
		max-width: min(100%, 630px);
		box-sizing: border-box;
		/* border: 1px solid var(--cloud-light); */
		padding: 20px;
		/* background-color: var(--cloud-faded); */
		border-radius: var(--br);
	}

	.response a {
		display: block;
		font-size: 16px;
		margin-top: 18px;
		opacity: 0.6;
	}

	.response a:hover {
		opacity: 1;
	}

	.response:nth-child(even) {
		align-self: flex-end;
	}
	.cloud-bg {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		/* mix-blend-mode: overlay; */
	}
</style>
