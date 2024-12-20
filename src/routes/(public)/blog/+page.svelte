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
<main class="m-auto flex max-w-7xl flex-1 flex-col items-center justify-center p-4">
	<h1 class="mb-4 text-2xl">Blog Articles</h1>
	{#if articles && articles.length > 0}
		<div class="flex w-full flex-wrap gap-4">
			{#each articles as article}
				<a
					href={`/blog/${article.name}`}
					class="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md sm:w-1/2 md:w-1/3"
				>
					<img src={`${article.image}`} alt={article.title} class="h-44 w-full" />
					<div class="p-4">
						<h2 class="mb-2 text-xl">{article.title}</h2>
						<p class="text-gray-600">{article.description}</p>
						<!-- Add more fields as necessary -->
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p>No articles found.</p>
	{/if}
</main>
