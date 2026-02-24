<script lang="ts">
	import QuizOnlyResults from './QuizOnlyResults.svelte';

	let { data } = $props();
</script>

<QuizOnlyResults {data} />
