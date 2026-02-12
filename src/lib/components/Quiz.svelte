<script lang="ts">
	import PromptWithSlider from '$lib/components/PromptWithSlider.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import type { Section } from '$lib/types';
	import { onMount } from 'svelte';
	import illustrations from '$lib/illustrations';
	import { _postResult } from '../../routes/api/result/+page';
	import { goto } from '$app/navigation';
	import intro1 from '$lib/assets/wayfinding/intro/1.png';
	import intro2 from '$lib/assets/wayfinding/intro/2.png';
	import intro3 from '$lib/assets/wayfinding/intro/3.png';
	import intro4 from '$lib/assets/wayfinding/intro/4.png';
	import intro5 from '$lib/assets/wayfinding/intro/5.png';
	import intro6 from '$lib/assets/wayfinding/intro/6.png';
	import intro7 from '$lib/assets/wayfinding/intro/7.png';
	import intro8 from '$lib/assets/wayfinding/intro/8.png';
	import { browser } from '$app/environment';

	let { data, isStart, pollCode = null } = $props();
	let loading = $state(false);

	// Cloud parallax variables
	let scrollY = $state(0);
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	const OVERLAY_OFFSET_LEFT_PERCENT = 5;
	const OVERLAY_OFFSET_BOTTOM_PERCENT = 4;

	// The cloud overlay has additional width/height on the left and bottom.
	// As the user scrolls, we translate the overlay to move towards these initially hidden edges.
	let percentMoved = $derived(Math.min(scrollY / innerHeight, 1));
	let translateX = $derived(percentMoved * ((OVERLAY_OFFSET_LEFT_PERCENT / 100) * innerWidth));
	let translateY = $derived(percentMoved * (-(OVERLAY_OFFSET_BOTTOM_PERCENT / 100) * innerHeight));

	let sectionRefs: HTMLElement[] = [];

	const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			const section = entry.target as HTMLElement;

			// Select all images within the current section
			const images = section.querySelectorAll<HTMLImageElement>('img');

			if (entry.isIntersecting) {
				// Show images
				images.forEach((image) => {
					image.classList.add('visible');
				});
			} else {
				// Hide images
				images.forEach((image) => {
					image.classList.remove('visible');
				});
			}
		});
	};

	onMount(() => {
		if (browser) {
			document.body.style.backgroundColor = 'var(--cloud)';
		}

		const observer = new IntersectionObserver(intersectionCallback, {
			threshold: 0.1 // Trigger when 10% of the section is visible
		});

		sectionRefs.forEach((section) => observer.observe(section));

		return () => {
			sectionRefs.forEach((section) => observer.unobserve(section));
		};
	});

	let storeSection = (el: HTMLElement) => {
		if (el && !sectionRefs.includes(el)) {
			sectionRefs.push(el);
		}
	};

	const sections: Section[] = $state(
		data.dynamics.map(({ full: dynamic }, idx) => {
			return {
				key: 'ABCDEFGH'[idx],
				dynamic,
				el: undefined,
				value: 3,
				bgImages: illustrations?.[idx]
			};
		})
	);

	function scrollToSection(evt: Event, idx: number) {
		// supercedes the default a tag link for smooth scrolling if javascript is enabled
		evt.preventDefault();
		const { el, key } = sections[idx];
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});

		// Focus the input in the given section once in view, preventing duplicate scrolling.
		// Unlike other browsers, Safari seems to assume focus-visible on a mouse link click,
		// so focusing to the section for Safari instead of the input to avoid triggering focus styles for mouse users.
		const elementIdToFocus = navigator.userAgent.includes('Safari') ? `section-${idx}` : key;
		document.getElementById(elementIdToFocus)?.focus({ preventScroll: true });
	}

	const resultsLink = $derived.by(() => {
		let link = '/results/';
		for (const s of sections) {
			link += `${s.key}${s.value}`;
		}
		return link;
	});

	const onFinish = $derived.by(() => {
		return async () => {
			loading = true;
			const valuesByDynamic = sections.reduce<{ [key: string]: number }>((dynamicsMap, s, i) => {
				dynamicsMap[`d${i + 1}`] = s.value;
				return dynamicsMap;
			}, {});
			const resp = await _postResult({
				...valuesByDynamic,
				isStart,
				startCode: data.startCode,
				pollCode
			});
			const newResult = resp.data;
			if (pollCode) {
				goto(`/poll/${pollCode}/post-quiz/${newResult.resultCode}`);
			} else {
				goto(`/results/${newResult?.resultCode}`);
			}
		};
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main onscroll={(e) => (scrollY = (e.target as HTMLElement)?.scrollTop)}>
	<div class="logo-wrapper">
		<Logo onDark={true} relative={true} />
		<!-- <div class="page-name">
			{#if isStart}
				Starting Point Quiz
			{:else}
				Ending Point Quiz
			{/if}
		</div> -->
	</div>
	<section class="intro">
		<div class="intro-img-wrapper static-fade-in left">
			<img class="intro-img" src={intro2} alt="" />
			<img class="intro-img" src={intro3} alt="" />
			<img class="intro-img" src={intro6} alt="" />
			<img class="intro-img" src={intro8} alt="" />
		</div>
		<div class="intro-img-wrapper static-fade-in right">
			<img class="intro-img" src={intro1} alt="" />
			<img class="intro-img" src={intro4} alt="" />
			<img class="intro-img" src={intro5} alt="" />
			<img class="intro-img" src={intro7} alt="" />
		</div>
		<div class="content">
			<h1 class="title">8 Dynamics of Climate Engagement</h1>

			<p>
				Below, you'll find each of the 8 Dynamics with a sliding bar. Take a moment to reflect on
				each statement and consider what is real for you, right now. Respond on a spectrum from 1 (<i
					>that's not true for me</i
				>) to 5 (<i>that's extremely true for me</i>).
			</p>
			<a class="btn secondary short" href="#section-0" onclick={(e) => scrollToSection(e, 0)}
				>Start</a
			>
		</div>
	</section>

	{#each sections as section, index}
		<!-- Allow focus jumping to section to avoid focus styles being applied to input on Safari link click -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<section id={`section-${index}`} tabindex={-1} bind:this={section.el} use:storeSection>
			<PromptWithSlider
				bind:value={section.value}
				{section}
				{index}
				handleSectionChange={scrollToSection}
				onFinish={index === sections.length - 1 ? onFinish : null}
				resultsLink={index === sections.length - 1 ? resultsLink : null}
				{loading}
			/>
		</section>
	{/each}
</main>

<style>
	main {
		overflow: scroll;
		height: 100vh;
		height: 100dvh;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		overscroll-behavior: contain;
		position: relative;
		/* background-color: var(--cloud); */
	}
	section {
		height: 100vh;
		height: 100dvh;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		scroll-snap-align: start;
		scroll-padding: 2em;
		outline: 0px;
		position: relative;
	}
	.content .title {
		font-size: 60px;
	}
	section.intro {
		padding: 2rem 200px;
		padding-top: 100px;
	}
	section.intro .content {
		width: var(--width-large);
		text-align: center;
		max-width: 100%;
		position: relative;
		z-index: 2;
	}
	.intro p {
		text-align: center;
		font-family: 'Area Normal', Helvetica, Arial, sans-serif;
		font-size: 18px;
		font-weight: 200;
		/* line-height: 1.5; */
		margin-bottom: 50px;
	}
	.logo-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: sticky;
		top: 0px;
		left: 0px;
		background: linear-gradient(var(--cloud), var(--cloud), #faf6f000);
		z-index: 5;
		padding: 30px 60px;
		box-sizing: border-box;
		gap: 20px;
		margin-top: -100px;
	}
	.intro-img {
		position: relative;
	}
	.intro-img-wrapper {
		position: absolute;
		top: 0px;
		height: 100vh;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 16px;
		animation-delay: 0.3s;
	}

	.intro-img-wrapper.left {
		left: 0px;
	}

	.intro-img-wrapper.right {
		right: 0px;
		align-items: flex-end;
	}

	@media (max-width: 850px) {
		/* reducing the opacing when the images overlap with the section text
		for better readability */
		.intro-img-wrapper {
			animation: partialOpacityFadeIn 1s ease 0s 1 forwards;
			animation-delay: 0.4s;
		}

		section.intro {
			padding: 2rem 60px;
			padding-top: 100px;
		}

		section.intro {
			padding-top: 120px;
		}
		.logo-wrapper {
			display: flex;
			/* flex-direction: column; */
			/* justify-content: center; */
			width: 100%;
			padding: 20px;
			gap: 16px;
		}
	}

	@media (max-width: 450px) {
		.intro p {
			font-size: 16px;
			background-color: var(--cloud-faded);
			padding: 10px 3px;
			border-radius: var(--br);
		}

		section.intro {
			padding: 2rem 20px;
			padding-top: 100px;
		}
	}

	@keyframes partialOpacityFadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.1;
		}
	}
</style>
