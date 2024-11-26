<script>
	import AppStore from './btns/AppStore.svelte';
	import GooglePlay from './btns/GooglePlay.svelte';
</script>

<section class="mb-12 px-6 py-8 text-center lg:mb-12">
	<div class="mb-5 mt-12">
		<h2 class="leading-loose lg:text-5xl">
			<span> Get the app to </span>
			<br />
			<span class="text-secondary-500"> quit caffeine for good!</span>
		</h2>
	</div>
	<div class="mx-auto mb-12 mt-4 flex max-w-md flex-col justify-between gap-2 md:flex-row">
		<GooglePlay />
		<AppStore />
	</div>
</section>
