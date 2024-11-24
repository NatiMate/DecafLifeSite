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

	<h1 class="m-0 mb-2 font-semibold leading-none">Quit caffeine!</h1>

	<h1 class="text-secondary-500 mb-8 font-semibold leading-none">For good.</h1>

	<p class="text-text-400 mx-auto mb-6 max-w-2xl text-lg leading-snug md:text-xl">
		Finally kick your coffee addiction and the caffeine withdrawal for a caffeine free life!
	</p>

	<div class="mx-auto mb-6 flex max-w-md flex-col justify-between gap-2 sm:flex-row">
		<GooglePlay />
		<AppStore />
	</div>
</section>
