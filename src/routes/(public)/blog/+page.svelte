<script>
	export let data;
	const { articles } = data;
</script>

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
