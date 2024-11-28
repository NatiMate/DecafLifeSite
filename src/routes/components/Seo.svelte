<script>
	import { page } from '$app/stores';

	export let title;
	export let description;
	export let type = 'Website';
	export let image;

	let url = $page.url.href;
</script>

<svelte:head>
	<title>Rezepte, die im Angebot sind</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<meta
		name="keywords"
		content="günstige, rezepte, angebote, im Angebot, günstig, einfach, lecker, kochen, kochrezepte, kochideen, essen, rabatt, sparen, supermarkt"
	/>
	<meta name="image" content="" />
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
