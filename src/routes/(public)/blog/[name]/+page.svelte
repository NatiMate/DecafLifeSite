<script lang="ts">
	import { browser } from '$app/environment';
	import {
		ChevronLeft,
		ChevronRight,
		Facebook,
		House,
		Link,
		Linkedin,
		Twitter
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
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

	// Function to handle sharing the link
	async function shareLink(sectionId: string) {
		const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
		const shareData = {
			url: url
		};

		if (navigator.share && window.innerWidth <= 768) {
			navigator
				.share(shareData)
				.then(() => console.log('Successful share'))
				.catch((error) => console.error('Error sharing', error));
		} else {
			// Fallback to copy link to clipboard if share is not supported
			copyLinkToClipboard(sectionId);
		}
	}

	let articleLink = `https://my-decaf-life.com/blog/${article.name}`;

	// Function to copy the link to the clipboard
	function copyLinkToClipboard(sectionId: string) {
		const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
		var dummy = document.createElement('input'),
			text = url;

		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		toast.success('Link copied. You can now share it!');
	}

	onMount(() => {
		console.log(article);
		if (browser) {
			window.addEventListener('scroll', updateScrollProgress);
		}
		return () => {
			if (browser) {
				window.removeEventListener('scroll', updateScrollProgress);
			}
		};
	});
</script>

<Seo
	title={`${article.title} | My Decaf Life`}
	image={`https://my-decaf-life.com${article.image}`}
	description={article.description}
	type="article"
	keywords="quit coffee, quite caffeine, stop coffee, bad sleep, better sleep, stop caffeine, decaf, caffeine, quit, better life, health, wellness, lifestyle, coffee, tea, energy, focus, productivity, sleep, anxiety, depression, withdrawal, addiction, natural, alternative, healthy, lifestyle change, natural energy, no caffeine, no coffee, no tea, no energy drinks"
	logo="https://my-decaf-life.com/favicon.webp"
/>
<div id="scroll-progress"></div>

{#snippet cta()}
	<div class="mt-8 w-full rounded-lg border border-primary-500 bg-primary-50 p-6">
		<div class="flex w-full flex-col items-center md:flex-row md:justify-between">
			<h2 class="mb-4 text-xl font-medium text-primary-700 underline md:mb-0 md:text-2xl">
				Our app helps you quit caffeine
			</h2>
			<!-- CTA button -->
			<div class="flex items-center">
				<a
					href="/#cta"
					target="_self"
					class="rounded-md border border-primary-500 bg-primary-100 px-4 py-2 font-medium text-primary-500 hover:border-primary-400 hover:bg-primary-200 hover:text-black"
				>
					Get the App
				</a>
			</div>
		</div>
	</div>
{/snippet}

{#snippet sharingOptions()}
	<!-- Copying or Sharing -->
	<div class="mt-4 flex gap-2">
		<button
			onclick={() => shareLink('')}
			class="rounded-full border border-primary-500 bg-primary-100 p-2 hover:bg-primary-200"
		>
			<Link size={20} color="#BC6F53" />
		</button>
		<!-- Sharing Options -->
		<a
			href={`https://twitter.com/intent/tweet?url=${articleLink}&text=${article.title}`}
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full border border-primary-500 bg-primary-100 p-2 hover:bg-primary-200"
		>
			<Twitter size={20} color="#BC6F53" />
		</a>
		<a
			href={`https://www.facebook.com/sharer/sharer.php?u=${articleLink}&title=${article.title}`}
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full border border-primary-500 bg-primary-100 p-2 hover:bg-primary-200"
		>
			<Facebook size={20} color="#BC6F53" />
		</a>
		<a
			href={`https://www.linkedin.com/shareArticle?mini=true&url=${articleLink}&title=${article.title}`}
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full border border-primary-500 bg-primary-100 p-2 hover:bg-primary-200"
		>
			<Linkedin size={20} color="#BC6F53" />
		</a>
	</div>
{/snippet}

{#snippet author()}
	<!-- Author Information -->
	<div class="mb-2 flex items-center">
		<img
			src="/images/stefan_profile_image.jpg"
			alt="The author of the article"
			class="mr-2 h-16 w-16 rounded-full"
		/>
		<div class="flex flex-col">
			<span class="text-lg font-medium">Stefan Meintrup</span>
			<span>
				{new Date(article.date).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})}
			</span>
		</div>
	</div>
{/snippet}

{#if article}
	<div class="max-w-8xl m-auto flex flex-1 flex-row items-start justify-center">
		<!-- Article Content -->
		<div class="flex w-full max-w-6xl flex-col items-start justify-start p-4 text-left">
			<!-- Breadcrumb Navigation -->
			<div class="mb-4 mt-6 flex w-full gap-2 text-sm sm:mt-16">
				<a href="/" class="text-text-600 hover:underline">
					<House size={20} color="gray" />
				</a>
				<ChevronRight size={20} color="gray" />
				<a href="/blog" class="text-text-600 hover:underline">Posts</a>
				<ChevronRight size={20} color="gray" />
				<a href={`/blog/${article.name}`} class="font-medium text-secondary-500 hover:underline">
					{article.title}
				</a>
			</div>
			<h1 class="max-w-5xl py-4 text-left text-3xl leading-none tracking-tight md:text-5xl">
				{article.title}
			</h1>
			<div class="flex w-full max-w-5xl flex-col items-center justify-between md:flex-row">
				<p class="mb-8 max-w-2xl text-lg text-text-600">{article.description}</p>
				<div class="self-start">
					{@render author()}
				</div>
			</div>

			<div class="flex flex-col justify-between md:ml-16 md:flex-row md:justify-normal">
				<!-- Table of Contents -->
				<div class="md-sticky flex flex-1 flex-col py-4 md:w-1/3">
					<button
						class="mb-4 mr-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary-500 py-2 md:hidden"
						onclick={() => (showTOC = !showTOC)}
					>
						{#if showTOC}
							<span class="text-primary-500">Hide Table of Contents</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4 text-primary-500"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 15.75l7.5-7.5 7.5 7.5"
								/>
							</svg>
						{:else}
							<span class="text-primary-500">Show Table of Contents</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4 text-primary-500"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						{/if}
					</button>
					<div
						class="overflow-hidden transition-[max-height] duration-500 ease-in-out md:overflow-visible"
						style="max-height: {showTOC ? '1000px' : '0px'}"
					>
						<h2 class="mb-4 text-lg text-primary-500">Table of Contents</h2>
						<ul>
							{#each article.sections as section, index}
								<li class="mb-2">
									<a
										href={`#${section.title}`}
										class="text-xl hover:underline"
										onclick={(event) => scrollToSection(event, section.title)}
									>
										{section.title}
									</a>
									{#if section.subsections}
										<ul class="pl-4">
											{#each section.subsections as subsection}
												<li class="mt-1">
													<a
														href={`#${subsection.title}`}
														class="hover:underline"
														onclick={(event) => scrollToSection(event, subsection.title)}
													>
														{subsection.title}
													</a>
												</li>
											{/each}
										</ul>
									{/if}
								</li>
							{/each}
						</ul>
						{@render sharingOptions()}
					</div>
				</div>

				<div class="flex flex-1 flex-col md:w-2/3 md:flex-none md:p-4">
					{#if article.image !== ''}
						<img class="w-full rounded-3xl pb-2" src={`${article.image}`} alt={article.title} />
					{/if}
					<div class="sm:mx-16">
						{#each article.sections as section, index}
							{#if index === 1}
								{@render cta()}
							{/if}
							<h2 class="mt-6 flex scroll-mt-32 items-center" id={section.title}>
								{section.title}
								<button onclick={() => shareLink(section.title)} class="ml-2">
									<Link size={20} color="gray" />
								</button>
							</h2>
							{#if section.imageName !== ''}
								<img
									class="w-full rounded-lg pt-4"
									src={`${section.imageName}`}
									alt={section.title}
								/>
							{/if}
							<div class="pl-4 pt-4">
								{@html section.content}
							</div>
							{#if section.subsections}
								{#each section.subsections as subsection}
									<h3
										class="mb-4 mt-8 flex items-center text-2xl font-semibold"
										id={subsection.title}
									>
										{subsection.title}
										<button onclick={() => shareLink(subsection.title)} class="ml-2">
											<Link size={20} color="gray" />
										</button>
									</h3>
									<div class="pl-4">
										{@html subsection.content}
									</div>
								{/each}
							{/if}
						{/each}

						<hr class="mb-8 mt-16 h-px border-0 bg-primary-200 md:my-16" />
						<!-- Add the new section here -->
						<div class="mt-8 flex flex-1 flex-col items-center">
							<div class="flex w-full flex-col items-center md:flex-row md:justify-between">
								<h2 class="text-2xl font-medium">Share this post</h2>
								<div class="mt-2 md:mt-0">
									{@render sharingOptions()}
								</div>
							</div>
							<div class="mt-8 flex w-full flex-col items-center md:flex-row md:justify-between">
								<h2 class="mb-4 text-2xl font-medium md:mb-0">Written by</h2>
								{@render author()}
							</div>
							{@render cta()}
						</div>

						<div class="flex w-full flex-row justify-between pt-8 text-xl">
							{#if article.previousArticleName}
								<div class="flex flex-row items-center">
									<a
										href={`/blog/${article.previousArticleName}`}
										target="_self"
										class="flex items-center text-primary-500"
									>
										<ChevronLeft size={20} color="#BC6F53" />
										<span>{article.previousArticleName}</span>
									</a>
								</div>
							{/if}
							{#if article.nextArticleName}
								<a
									href={`/blog/${article.nextArticleName}`}
									target="_self"
									class="flex items-center text-primary-500"
								>
									<span>{article.nextArticleName}</span>
									<ChevronRight size={20} color="#BC6F53" />
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
			<div class="md:h-16"></div>
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

	/* Add media query to control sticky behavior */
	@media (min-width: 768px) {
		.md-sticky {
			position: sticky;
			top: 110px;
			height: 100vh;
			overflow-y: auto;
		}
	}

	/* Add padding to the Table of Contents on mobile */
	@media (max-width: 767px) {
		.md-sticky {
			padding-left: 16px; /* Adjust the padding value as needed */
		}
	}

	/* New styles for TOC animation */
	.toc-transition {
		transition: max-height 0.5s ease-in-out;
		overflow: hidden;
	}
</style>
