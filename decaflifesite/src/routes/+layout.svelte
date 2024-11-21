<script lang="ts">
	import '../app.css';
	import Header from './components/Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
</div>

<style>
	:global(html) {
		font-family: 'Outfit', sans-serif;
	}
</style>
