<script lang="ts">
	import '../app.css';
	import Analytics from './components/Analytics.svelte';
	import Footer from './components/Footer.svelte';
	import GdprBanner from './components/GdprBanner.svelte';
	import Header from './components/Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

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
