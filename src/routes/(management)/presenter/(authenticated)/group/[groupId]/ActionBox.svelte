<script>
	let { number, active, color, children } = $props();
</script>

<div class="action" class:active>
	<span style={`background-color:var(--${color});`}>
		{number}
	</span>
	{@render children()}
</div>

<style>
	.action {
		width: 100%;
		background-color: #fff;
		padding: 16px;
		border-radius: var(--br);
		box-sizing: border-box;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		opacity: 0.6;
		margin-bottom: 20px;
		text-align: center;
		padding-bottom: 24px;
	}
	.action.active {
		opacity: 1;
	}
	span {
		position: absolute;
		width: 36px;
		height: 36px;
		border-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 12px;
		left: 12px;
		font-weight: 800;
		line-height: normal;
		/* font-family: Arial, Helvetica, sans-serif; */
		font-size: 18px;
		color: var(--cloud);
	}
	@media screen and (max-width: 550px) {
		.action {
			padding-top: 46px;
		}
	}
</style>
