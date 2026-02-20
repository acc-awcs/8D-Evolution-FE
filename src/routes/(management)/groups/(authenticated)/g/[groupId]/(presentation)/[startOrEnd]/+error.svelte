<script>
	import { browser } from '$app/environment';

	function reloadPage() {
		if (browser) {
			location.reload();
		}
	}
</script>

<h1 class="title">One moment ...</h1>

<p>We’ve had trouble connecting, please try refreshing this page.</p>

<button class="btn primary" onclick={reloadPage}>Refresh</button>
