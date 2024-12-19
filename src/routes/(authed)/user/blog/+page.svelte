<script>
	export let data;
	const { articles } = data;

	function addNewArticle() {
		// Logic to add a new article
		console.log('Add new article button clicked');
	}
</script>

<main class="m-auto flex max-w-7xl flex-1 flex-col items-center justify-center p-4">
	<h1 class="mb-4 text-2xl">Blog Articles</h1>
	<div class="flex w-full flex-wrap gap-4">
		{#if articles && articles.length > 0}
			{#each articles as article}
				<a
					href={`/user/blog/${article.name}`}
					class="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md sm:w-1/2 md:w-1/3"
				>
					<img src={`${article.image}`} alt={article.title} class="h-44 w-full" />
					<div class="p-4">
						<h2 class="mb-2 text-xl">{article.title}</h2>
						<button class="rounded-md bg-primary-500 px-4 py-2 text-white"> bearbeiten </button>
					</div>
				</a>
			{/each}
		{:else}
			<p>No articles found.</p>
		{/if}

		<!-- Placeholder card for adding a new article -->
		<div
			class="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md sm:w-1/2 md:w-1/3"
		>
			<div class="p-4">
				<h2 class="mb-2 text-xl">Add New Article</h2>
				<a href="/user/blog/new" class="rounded-md bg-primary-500 px-4 py-2 text-white"
					>Add Article</a
				>
			</div>
		</div>
	</div>
</main>
