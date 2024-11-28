<script lang="ts">
	import quotationMarks from '$lib/assets/quotation_marks.png';
	import greenQuotationMarks from '$lib/assets/quotation_marks_green.png';
	import RedditLogo from '$lib/assets/reddit_logo.png';
	import XLogo from '$lib/assets/x_logo.png';
	import YoutubeLogo from '$lib/assets/youtube_logo.png';
	import { onMount } from 'svelte';

	interface Platform {
		name: string;
		logo: any;
	}

	interface Testimonial {
		quote: string;
		userName: string;
		platform: Platform;
	}
	const youtube: Platform = {
		name: 'Youtube',
		logo: YoutubeLogo
	};

	const x: Platform = {
		name: 'X',
		logo: XLogo
	};

	const reddit: Platform = {
		name: 'Reddit',
		logo: RedditLogo
	};

	const testimonials: Testimonial[] = [
		{
			quote:
				"My anxiety is gone. Like gone. It was about 5 weeks in when I realized, I'm just not anxious anymore. This was a life-long struggle, and this alone makes the sacrifice worthwhile.",
			userName: 'Donniefitz2',
			platform: reddit
		},
		{
			quote:
				"Caffeine gave me awful anxiety, after I quit I feel like a child... Just being myself it's amazing.",
			userName: 'Olly_evans',
			platform: youtube
		},
		{
			quote:
				'The quality of my sleep has improved and I feel less anxious. I never thought I would cut out caffiene.',
			userName: 'ProgressWithChrstina',
			platform: youtube
		},
		{
			quote:
				"I've suffered with brain fog since my mid teens, it's only since I stopped my caffeine intake that the clarity of my childhood has returned.",
			userName: 'Genuinetrueblue',
			platform: youtube
		},
		{
			quote: 'Quitting caffeine was one of the best decisions I made.',
			userName: 'Jhlotto',
			platform: x
		},
		{
			quote: 'No more anxiety + better sleep are the main wins for me.',
			userName: 'moderntechtropolis',
			platform: reddit
		},
		{
			quote:
				'I wake up ready to go, have continuous energy throughout the day and have had the most productive, stress free year of my life.',
			userName: 'SweetSweetCrunkle',
			platform: reddit
		}
	];

	// Create a duplicated array of testimonials for infinite scroll effect
	const repeatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
	let selectedTestimonial = $state(testimonials.length); // Start with middle set

	let testimonialContainer: HTMLElement;

	let isScrolling = false;

	onMount(() => {
		// Start at the middle set
		const targetElement = document.getElementById(`testimonial-${selectedTestimonial}`);
		targetElement?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
	});

	function decrementSelectedTestimonial() {
		if (isScrolling) return;
		isScrolling = true;

		selectedTestimonial--;
		const targetElement = document.getElementById(`testimonial-${selectedTestimonial}`);
		targetElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

		// If we're at the start of the first set, jump to the middle set
		if (selectedTestimonial < testimonials.length) {
			setTimeout(() => {
				selectedTestimonial = selectedTestimonial + testimonials.length;
				const newTarget = document.getElementById(`testimonial-${selectedTestimonial}`);
				newTarget?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
				isScrolling = false;
			}, 500); // Wait for smooth scroll to finish
		} else {
			setTimeout(() => {
				isScrolling = false;
			}, 500);
		}
	}
	function incrementSelectedTestimonial() {
		if (isScrolling) return;
		isScrolling = true;

		selectedTestimonial++;
		const targetElement = document.getElementById(`testimonial-${selectedTestimonial}`);
		targetElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

		// If we're at the end of the middle set, jump back to the start of the middle set
		if (selectedTestimonial >= testimonials.length * 2) {
			setTimeout(() => {
				selectedTestimonial = selectedTestimonial - testimonials.length;
				const newTarget = document.getElementById(`testimonial-${selectedTestimonial}`);
				newTarget?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
				isScrolling = false;
			}, 500); // Wait for smooth scroll to finish
		} else {
			setTimeout(() => {
				isScrolling = false;
			}, 500);
		}
	}
</script>

{#snippet testimonialSnippet(index: number, testimonial: Testimonial)}
	<div
		id={`testimonial-${index}`}
		class="flex h-full w-[340px] flex-col rounded-2xl border border-primary-200 bg-primary-50 p-8"
	>
		<div class="flex-grow">
			<img
				class="mb-2 w-[46px]"
				src={index === selectedTestimonial ? greenQuotationMarks : quotationMarks}
				alt="quotation marks"
			/>
			<h3 class="text-text-600">
				{testimonial.quote}
			</h3>
		</div>

		<div class="mt-4 flex flex-row items-center gap-2">
			<img
				class="h-[36px] w-[36px]"
				src={testimonial.platform.logo}
				alt={testimonial.platform.name}
			/>
			<div>
				<p class="text-sm text-secondary-800">{testimonial.userName}</p>
				<p class="text-xs font-light">Posted on {testimonial.platform.name}</p>
			</div>
		</div>
	</div>
{/snippet}

<section id="testimonials" class="bg-primary-100 py-8 lg:bg-primary-50 lg:py-32">
	<h2 class="text-center leading-tight lg:mb-16 lg:text-5xl">
		<span class=" text-secondary-500"> What people say </span>
		<br />
		<span> about quitting caffeine </span>
	</h2>
	<!-- Testimonial cards container -->
	<div class="relative w-full overflow-hidden">
		<!-- Gradient overlays for lg screens -->
		<div
			class="absolute left-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-r from-primary-50 to-transparent lg:block"
		></div>
		<div
			class="absolute right-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-l from-primary-50 to-transparent lg:block"
		></div>

		<!-- Testimonials scroll container -->
		<div
			class="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 py-6 lg:gap-8"
			bind:this={testimonialContainer}
		>
			{#each repeatedTestimonials as testimonial, i}
				<div class="shrink-0 snap-center">
					{@render testimonialSnippet(i, testimonial)}
				</div>
			{/each}
		</div>
	</div>
	<div class="flex justify-center gap-8 text-text-400">
		<button
			class="rounded-full"
			onclick={() => decrementSelectedTestimonial()}
			aria-label="Previous testimonial"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-[28px] w-[28px]"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		</button>
		<button
			class="rounded-full"
			onclick={() => incrementSelectedTestimonial()}
			aria-label="Next testimonial"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-[28px] w-[28px]"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
			</svg>
		</button>
	</div>
</section>
