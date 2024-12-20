<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Analytics from './components/Analytics.svelte';
	import Footer from './components/Footer.svelte';
	import GdprBanner from './components/GdprBanner.svelte';
	import Header from './components/Header.svelte';
	import Seo from './components/Seo.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Seo
	title="My Decaf Life"
	image="https://my-decaf-life.com/favicon.webp"
	description="Quit caffeine for a better life."
	type="Website"
	keywords="quit coffee, quite caffeine, stop coffee, bad sleep, better sleep, stop caffeine, decaf, caffeine, quit, better life, health, wellness, lifestyle, coffee, tea, energy, focus, productivity, sleep, anxiety, depression, withdrawal, addiction, natural, alternative, healthy, lifestyle change, natural energy, no caffeine, no coffee, no tea, no energy drinks"
/>
<Toaster richColors position="top-right" />
<div class="flex min-h-screen flex-col bg-almost-white">
	<Analytics />
	<Header />
	<main class="flex flex-1 flex-col">
		{@render children()}
		<GdprBanner />
	</main>
	<Footer />
</div>

<style>
	:global(html) {
		font-family: 'Outfit', sans-serif;
	}
</style>
