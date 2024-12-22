<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Analytics from './components/Analytics.svelte';
	import Footer from './components/Footer.svelte';
	import GdprBanner from './components/GdprBanner.svelte';
	import Header from './components/Header.svelte';
	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Toaster richColors position="top-right" />
<div class="flex min-h-screen flex-col bg-almost-white">
	<Analytics />
	<Header />
	<main class="max-w-screen flex flex-1 flex-col">
		{@render children()}
		<GdprBanner />
	</main>
	<Footer />
</div>

<style>
	:global(html) {
		font-family: 'Outfit', sans-serif;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	:root::view-transition-old(root) {
	}

	:root::view-transition-new(root) {
		animation: 600ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
	}
</style>
