<script>
	import { page } from '$app/stores';

	export let title;
	export let description;
	export let type = 'Website';
	export let image;
	export let keywords;

	let url = $page.url.href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<meta name="keywords" content={keywords} />
	<meta name="image" content={image} />
	<meta name="url" content={url} />

	<meta name="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta name="og:image" content={image} />
	<meta name="og:url" content={url} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:url" content={url} />
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "${type}",
			"name": "${title}",
            "image": "${image}",
			"description": "${description}",
			"url": "${url}"
		}
</script>`}
</svelte:head>
