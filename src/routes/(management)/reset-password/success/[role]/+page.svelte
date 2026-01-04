<script>
	import { page } from '$app/stores';
	import { ADMIN } from '$lib/constants';

	$: role = $page.params.role;
</script>

<h1 class="title">Success!</h1>

<p>Your password has been successfully updated. You can now log in with your new password.</p>

<br />

<a href="/{role === ADMIN ? 'admin' : 'presenter'}/login" class="btn primary"> Back to Login </a>
