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
