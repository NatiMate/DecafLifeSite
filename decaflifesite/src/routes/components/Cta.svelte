<script>
	import AppStore from './btns/AppStore.svelte';
	import GooglePlay from './btns/GooglePlay.svelte';
</script>

<section id="cta" class="mb-12 px-6 py-8 text-center lg:mb-12">
	<div class="mb-5 mt-12">
		<h2 class="leading-snug lg:text-5xl lg:leading-snug">
			<span> Get the app to </span>
			<br />
			<span class="text-secondary-500"> quit caffeine for good!</span>
		</h2>
		<p class="text-text-400 mx-auto mt-4 max-w-xl">
			Stop drinking coffee or other caffeinated beverages and finally get rid of your caffeine
			dependance. It might not be easy, but it will be worth it and our app will keep you motivated.
		</p>
	</div>
	<div class="mx-auto mb-12 mt-4 flex max-w-md flex-col justify-between gap-2 md:flex-row">
		<GooglePlay />
		<AppStore />
	</div>
</section>
