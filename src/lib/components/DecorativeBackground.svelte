<script lang="ts">
	import square from '$lib/assets/wayfinding/cloud-square.png';
	import square2 from '$lib/assets/wayfinding/cloud-square-2.png';
	import arcCorner from '$lib/assets/wayfinding/arc-corner.png';
	import arcSide from '$lib/assets/wayfinding/arc-side.png';
	import magLong from '$lib/assets/wayfinding/magnestism-2x-3.svg';
	import magSquare from '$lib/assets/wayfinding/magnestism-2x2.svg';

	let { opacity = false } = $props();
</script>

<div class="wrapper">
	<!-- Decorative images -->
	<img class="square" class:opacity src={square} alt="" />
	<img class="square-2" class:opacity src={square2} alt="" />
	<img class="arc-corner" src={arcCorner} alt="" />
	<img class="arc-side" src={arcSide} alt="" />
	<img class="mag-long" src={magLong} alt="" />
	<img class="mag-square" src={magSquare} alt="" />
</div>

<style>
	/* .wrapper {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: absolute;
		top: 0px;
		left: 0px;
	} */
	img {
		position: fixed;
		/* z-index: 0; */
	}

	.square {
		z-index: 1;
		bottom: 0px;
		left: 40px;
		width: 235px;
		height: 148px;
	}

	.square-2 {
		right: 0px;
		top: 80px;
		width: 134px;
		height: 230px;
	}

	.arc-side {
		left: 0px;
		top: 80px;
		width: 203px;
		height: 336px;
	}

	.arc-corner {
		bottom: 0px;
		right: 0px;
		width: 235px;
		height: 240px;
	}

	.mag-square {
		bottom: 0px;
		left: 0px;
		width: 228px;
		height: 304px;
	}

	.mag-long {
		right: 0px;
		top: 180px;
		width: 103px;
		height: 322px;
	}

	.square,
	.square-2 {
		opacity: 1;
		transition: opacity 0.2s ease;
	}

	@media screen and (max-width: 800px) {
		.square.opacity,
		.square-2.opacity {
			opacity: 0.6;
		}
	}

	@media screen and (max-height: 600px) {
		.arc-side,
		.arc-corner {
			opacity: 0;
		}
	}

	@media screen and (max-width: 600px) {
		.arc-corner {
			right: -20px;
		}

		.square {
			left: -20px;
			bottom: -10px;
			width: calc(235px / 2);
			height: calc(148px / 2);
		}

		.square-2 {
			right: -10px;
			top: 70px;
			width: calc(134px / 2);
			height: calc(230px / 2);
		}

		.arc-side {
			left: -6px;
			top: 170px;
			width: calc(203px / 2);
			height: calc(336px / 2);
		}

		.arc-corner {
			bottom: 0px;
			right: 0px;
			width: calc(235px / 2);
			height: calc(240px / 2);
		}

		.mag-square {
			bottom: -20px;
			left: -40px;
			width: calc(228px / 2);
			height: calc(304px / 2);
		}

		.mag-long {
			right: -10px;
			top: 130px;
			width: calc(103px / 2);
			height: calc(322px / 2);
		}
	}
</style>
