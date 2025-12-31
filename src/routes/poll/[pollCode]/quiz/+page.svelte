<script>
	import Quiz from '$lib/components/Quiz.svelte';

	let { data } = $props();
</script>

<Quiz {data} pollCode={data.pollCode} />
