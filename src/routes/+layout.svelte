<script lang="ts">
	import '$lib/styles/app.css';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
</script>

<svelte:head>
	<title>Climate Wayfinding 8 Dynamics Quiz</title>
	<meta name="description" content="Explore your dynamics of climate engagement" />
	<!-- Image tag must be FQDN -->
	<meta
		property="og:image"
		content="https://dynamics-quiz.allwecansave.earth/images/dynamics_static.png"
	/>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
