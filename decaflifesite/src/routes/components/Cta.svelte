<script>
	import AppStore from './btns/AppStore.svelte';
	import GooglePlay from './btns/GooglePlay.svelte';
</script>

<section class="px-6 py-8 text-center">
	<div class="mb-5 mt-12">
		<h2 class="leading-tight">
			<span> Get the app to </span>
			<br />
			<span class="text-secondary-500"> quit caffeine for good!</span>
		</h2>
	</div>
	<div class="mb-12 mt-4 flex flex-col justify-between gap-2 md:flex-row">
		<GooglePlay />
		<AppStore />
	</div>
</section>
