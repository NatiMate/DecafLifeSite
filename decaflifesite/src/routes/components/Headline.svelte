<script>
	import headerImage from '$lib/assets/header_image.webp';
	import AppStore from './btns/AppStore.svelte';
	import GooglePlay from './btns/GooglePlay.svelte';
</script>

<section class="mx-auto max-w-4xl px-6 pt-6 text-center">
	<img
		src={headerImage}
		alt="Person drinking water instead of coffee"
		class="mx-auto mb-8 w-full max-w-lg rounded-lg"
	/>

	<h1 class="mb-2 text-5xl font-bold md:text-5xl">Quit caffeine!</h1>

	<h2 class="text-secondary-500 mb-8 text-5xl font-bold md:text-4xl">For good.</h2>

	<p class="text-text-600 mx-auto mb-6 max-w-2xl text-lg md:text-xl">
		Finally kick your coffee addiction and the caffeine withdrawal for a caffeine free life!
	</p>

	<div class="mb-6 flex flex-row justify-between gap-2 sm:flex-row">
		<GooglePlay />
		<AppStore />
	</div>
</section>
