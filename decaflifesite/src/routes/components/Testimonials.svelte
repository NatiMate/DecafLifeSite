<script lang="ts">
	import quotationMarks from '$lib/assets/quotation_marks.png';
	import greenQuotationMarks from '$lib/assets/quotation_marks_green.png';
	import RedditLogo from '$lib/assets/reddit_logo.png';
	import XLogo from '$lib/assets/x_logo.png';
	import YoutubeLogo from '$lib/assets/youtube_logo.png';

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

	let selectedTestimonial = $state(0);
	let testimonialContainer: HTMLElement;

	function decrementSelectedTestimonial() {
		if (selectedTestimonial > 0) {
			selectedTestimonial--;
			const targetElement = document.getElementById(`testimonial-${selectedTestimonial}`);
			targetElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	}
	function incrementSelectedTestimonial() {
		if (selectedTestimonial < testimonials.length - 1) {
			selectedTestimonial++;
			const targetElement = document.getElementById(`testimonial-${selectedTestimonial}`);
			targetElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	}
</script>

{#snippet testimonialSnippet(index: number, testimonial: Testimonial)}
	<div
		id={`testimonial-${index}`}
		class="bg-primary-50 border-primary-200 flex h-full min-w-[300px] flex-col rounded-2xl border p-8 lg:min-w-[340px]"
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
				<p class="text-secondary-800 text-sm">{testimonial.userName}</p>
				<p class="text-xs font-light">Posted on {testimonial.platform.name}</p>
			</div>
		</div>
	</div>
{/snippet}

<section id="testimonials" class="bg-primary-100 lg:bg-primary-50 py-8 lg:py-32">
	<h2 class="text-center leading-tight lg:mb-16 lg:text-5xl">
		<span class=" text-secondary-500"> What people say </span>
		<br />
		<span> about quitting caffeine </span>
	</h2>
	<!-- Testimonial cards container -->
	<div class="relative">
		<!-- Gradient overlays for lg screens -->
		<div
			class="from-almost-white absolute left-0 top-0 z-10 hidden h-full w-96 bg-gradient-to-r to-transparent lg:block"
		></div>
		<div
			class="from-almost-white absolute right-0 top-0 z-10 hidden h-full w-96 bg-gradient-to-l to-transparent lg:block"
		></div>

		<!-- Testimonials scroll container -->
		<div
			class="my-6 flex snap-x snap-mandatory gap-4 overflow-x-hidden scroll-smooth px-6 lg:mb-16"
			bind:this={testimonialContainer}
		>
			{#each testimonials as testimonial, i}
				<div class="snap-center first:ml-auto last:mr-auto">
					{@render testimonialSnippet(i, testimonial)}
				</div>
			{/each}
		</div>
	</div>
	<div class="text-text-400 flex justify-center gap-8">
		<button
			class:invisible={selectedTestimonial === 0}
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
			class:invisible={selectedTestimonial === testimonials.length - 1}
			class="rounded-full"
			aria-label="Next testimonial"
			onclick={() => incrementSelectedTestimonial()}
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
