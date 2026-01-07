<script>
	import { page } from '$app/state';
</script>

<h1 class="title">Invalid Link</h1>

<p>
	Looks like this reset password link is no longer valid. You can request a new link on our forgot
	password page.
</p>

<br />

<a href={`/${page.params.role}/reset-password`} class="btn primary"> Back to Forgot Password </a>
