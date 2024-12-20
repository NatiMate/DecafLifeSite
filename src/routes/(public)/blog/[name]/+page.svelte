<script lang="ts">
	import { ChevronRight, House } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Seo from '../../../components/Seo.svelte';
	let { data } = $props();
	let article = data.content ? JSON.parse(data.content) : null;
	let showTOC = $state(false); // State to control TOC visibility

	// Function to update the scroll progress
	function updateScrollProgress() {
		const scrollProgress = document.getElementById('scroll-progress');
		const totalHeight = document.body.scrollHeight - window.innerHeight;
		const progress = (window.scrollY / totalHeight) * 100;
		if (scrollProgress) {
			scrollProgress.style.width = `${progress}%`;
		}
	}

	// Function to handle smooth scrolling to sections
	function scrollToSection(event: Event, sectionId: string) {
		event.preventDefault();
		const sectionElement = document.getElementById(sectionId);
		if (sectionElement) {
			sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	onMount(() => {
		console.log(article);
		window.addEventListener('scroll', updateScrollProgress);
		return () => {
			window.removeEventListener('scroll', updateScrollProgress);
		};
	});
</script>

<Seo
	title={`${article.title} | My Decaf Life`}
	image={article.image}
	description={article.description}
	type="Website"
	keywords="quit coffee, quite caffeine, stop coffee, bad sleep, better sleep, stop caffeine, decaf, caffeine, quit, better life, health, wellness, lifestyle, coffee, tea, energy, focus, productivity, sleep, anxiety, depression, withdrawal, addiction, natural, alternative, healthy, lifestyle change, natural energy, no caffeine, no coffee, no tea, no energy drinks"
/>
<div id="scroll-progress"></div>

{#if article}
	<div class="max-w-8xl m-auto flex flex-1 flex-row items-start justify-center">
		<!-- Article Content -->
		<div class="flex w-3/4 flex-col items-start justify-start text-left">
			<!-- Breadcrumb Navigation -->
			<div class="mb-4 mt-12 flex w-full gap-2 sm:mt-24">
				<House />
				<ChevronRight />
				<a href="/blog" class="text-primary-500 hover:underline">Posts</a>
				<ChevronRight />
				<a href={`/blog/${article.name}`} class="text-primary-500 hover:underline">
					{article.title}
				</a>
			</div>
			<h1 class="text-left">{article.title}</h1>
			<p>{article.description}</p>
			<p>
				{new Date(article.date).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})}
			</p>

			<div class="flex flex-col md:flex-row">
				<!-- Table of Contents -->
				<div
					class="flex flex-1 p-4 md:sticky md:w-1/4"
					style="position: -webkit-sticky; top: 110px; height: 100vh; overflow-y: auto;"
				>
					<button
						class="mb-4 flex w-full items-center justify-center gap-2 md:hidden"
						onclick={() => (showTOC = !showTOC)}
					>
						{#if showTOC}
							Hide Table of Contents
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 15.75l7.5-7.5 7.5 7.5"
								/>
							</svg>
						{:else}
							Show Table of Contents
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						{/if}
					</button>
					<div class="{showTOC ? 'block' : 'hidden'} md:block">
						<h2>Table of Contents</h2>
						<ul>
							{#each article.sections as section}
								<li>
									<a
										href={`#${section.title}`}
										onclick={(event) => scrollToSection(event, section.title)}
									>
										{section.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="flex flex-1 flex-col p-4 md:w-3/4 md:flex-none">
					<img class="w-full rounded-3xl" src={`${article.image}`} alt={article.title} />
					<div class="sm:mx-16">
						{#each article.sections as section}
							<h2 class="mt-4 scroll-mt-32" id={section.title}>{section.title}</h2>
							<img class="w-full rounded-lg" src={`${section.imageName}`} alt={section.title} />
							<p>{section.content}</p>

							{#if section.subsections}
								<h3 class="mb-4 mt-8 text-2xl font-semibold">{section.subsections.title}</h3>
								<p>{section.subsections.content}</p>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="flex flex-1 flex-col items-center justify-center">
		<h1>404</h1>
		<p>No article found</p>
		<!-- CTA button -->
		<div class="flex items-center">
			<a
				href="/"
				class="rounded-md border border-primary-200 bg-primary-100 px-4 py-2 text-sm font-medium text-primary-500 hover:border-primary-400"
			>
				Go to Home
			</a>
		</div>
	</div>
{/if}

<style>
	#scroll-progress {
		position: fixed;
		top: 110px;
		left: 0;
		height: 4px;
		background-color: #bc6f53; /* Updated color */
		width: 0;
		z-index: 1000;
	}
</style>
