<script>
	import AppStore from './btns/AppStore.svelte';
	import GooglePlay from './btns/GooglePlay.svelte';
</script>

<section class="px-6 py-8 text-center">
	<div class="mb-5 mt-12">
		<h2>
			<span> Get the app to </span>
			<span class="text-secondary-500"> quit caffeine for good!</span>
		</h2>
	</div>
	<div class="mt-12 flex flex-row justify-between gap-2">
		<GooglePlay />
		<AppStore />
	</div>
</section>
