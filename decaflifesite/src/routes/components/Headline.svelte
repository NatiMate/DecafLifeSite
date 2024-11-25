<script>
	import headerImage from '$lib/assets/header_image.webp';
	import AppStore from './btns/AppStore.svelte';
	import GooglePlay from './btns/GooglePlay.svelte';
	import redditIcon from '$lib/assets/reddit.jpg';
</script>

<section
	class="mx-auto max-w-4xl px-6 pt-6 text-center lg:flex lg:max-w-6xl lg:items-center lg:gap-12 lg:py-32 xl:max-w-7xl"
>
	<img
		src={headerImage}
		alt="Person drinking water instead of coffee"
		class="mx-auto mb-8 w-full max-w-lg rounded-lg lg:order-2 lg:mb-0 xl:max-w-[600px]"
	/>

	<div class="lg:order-1 lg:text-left">
		<h1 class="m-0 mb-2 font-semibold leading-none lg:text-7xl">Quit caffeine!</h1>
		<h1 class="text-secondary-500 mb-8 font-semibold leading-none lg:text-7xl">For good.</h1>

		<p
			class="text-text-400 mx-auto mb-6 max-w-lg text-lg leading-snug md:text-xl lg:mx-0 xl:max-w-lg"
		>
			Finally kick your coffee addiction and the caffeine withdrawal for a caffeine free life!
		</p>

		<div class="mx-auto mb-6 flex max-w-md flex-col justify-between gap-2 sm:flex-row lg:m-0">
			<GooglePlay />
			<AppStore />
		</div>

		<div class="hidden lg:block">
			<p
				class="text-text-400 mx-auto mt-6 max-w-2xl text-base italic leading-snug lg:mx-0 lg:max-w-lg"
			>
				"Getting up is soooo much easier, no more crashing will make all the difference in the
				amount of energy during the day."
			</p>
			<div class="my-2 flex items-center gap-2 lg:justify-start">
				<img src={redditIcon} alt="Reddit icon" class="h-6 w-6" />
				<span class="font-medium"> HexagonOrNot </span>
				<span class="text-text-400">on Reddit</span>
			</div>
		</div>
	</div>
</section>
