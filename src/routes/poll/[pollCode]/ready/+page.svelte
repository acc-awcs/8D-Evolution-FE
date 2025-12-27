<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonLoader from '$lib/components/ButtonLoader.svelte';

	let { data } = $props();
	let loading = $state(false);
</script>

<h1 class="title">Hang Tight ...</h1>
<p>You're all set!</p>
<p>Once your facilitator starts the session, this page will automatically update.</p>
