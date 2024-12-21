<script>
	import Seo from '../../components/Seo.svelte';

	export let data;
	const { articles } = data;
</script>

<Seo
	title="Advice to Quit and Stop Caffeine | My Decaf Life"
	image="https://my-decaf-life.com/favicon.webp"
	description="Blog articles and advice on how to quit caffeine. The impact of coffee and caffeine on sleep, anxiety, and depression."
	type="Website"
	keywords="quit coffee, quite caffeine, stop coffee, bad sleep, better sleep, stop caffeine, decaf, caffeine, quit, lifestyle change, natural energy, no caffeine, no coffee, no tea, no energy drinks"
/>
<main class="m-auto mt-16 flex max-w-7xl flex-1 flex-col items-center justify-center p-4">
	<h1 class="mb-4 mr-auto text-6xl text-text-950">Quit caffeine blog</h1>
	<p class="font-400 mr-auto max-w-2xl text-lg text-gray-600">
		Discover tips, stories, and expert advice to help you quit caffeine and embrace a healthier,
		more balanced lifestyle. Whether you're cutting back or quitting entirely, we’re here to guide
		you every step of the way.
	</p>
	{#if articles && articles.length > 0}
		<div class="mt-2 flex w-full flex-wrap gap-4 md:my-16">
			{#each articles as article}
				<a
					href={`/blog/${article.name}`}
					class="my-2 flex w-[300px] flex-col overflow-hidden rounded-lg bg-white shadow-sm md:w-[360px]"
				>
					<img src={`${article.image}`} alt={article.title} class="h-44 w-full object-cover" />
					<div class="p-4">
						<p class="text-text-500">{article.date}</p>
						<h2 class="mb-2 text-xl text-text-700">{article.title}</h2>

						<!-- Add more fields as necessary -->
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p>No articles found.</p>
	{/if}
</main>
