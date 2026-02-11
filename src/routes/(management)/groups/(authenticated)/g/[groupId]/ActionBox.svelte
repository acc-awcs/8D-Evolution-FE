<script>
	let { number, active, color, title, children } = $props();
</script>

<div class="action" class:active style={`background-color:var(--${color});`}>
	<span class="title" style={`background-color:var(--${color});`}>
		{number}
	</span>
	<h2 class="title small">{title}</h2>
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.action {
		width: 100%;
		background-color: #fff;
		border: 1px solid #fff;
		border-radius: var(--br);
		box-sizing: border-box;
		/* box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1); */
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		opacity: 0.6;
		margin-bottom: 40px;
		margin-top: 16px;
		text-align: center;
		overflow: hidden;
		/* padding-bottom: 24px; */
	}
	.action.active {
		opacity: 1;
	}
	span {
		position: absolute;
		/* width: 40px;
		height: 40px; */
		border-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 5px;
		left: 10px;
		font-weight: 800;
		line-height: normal;
		/* font-family: Arial, Helvetica, sans-serif; */
		font-size: 28px;
		color: var(--onyx);
	}
	.content {
		width: 100%;
		background-color: var(--cloud);
		padding: 16px;

		/* border-radius: 0px 0px var(--br) var(--br); */
		box-sizing: border-box;
		/* box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1); */
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		/* margin-bottom: 20px; */
		text-align: center;
		padding-bottom: 24px;
	}
	.title {
		padding: 0px 16px;
		margin: 20px 0px;
	}
	@media screen and (max-width: 550px) {
		span {
			left: 6px;
			top: 0px;
		}
		.action {
			padding-top: 46px;
		}
	}
	@media screen and (max-width: 600px) {
		.title {
			margin-right: auto;
		}
	}
</style>
