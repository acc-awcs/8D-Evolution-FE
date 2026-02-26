<script lang="ts">
	import SurveyResults from './SurveyResults.svelte';

	let { data } = $props();
</script>

<SurveyResults {data} />
