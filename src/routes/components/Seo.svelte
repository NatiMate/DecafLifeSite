<script>
	import { page } from '$app/stores';

	export let title;
	export let description;
	export let type = 'Website';
	export let image;
	export let keywords;
	export let logo;

	let url = $page.url.href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" property="title" content={title} />
	<meta name="description" property="description" content={description} />
	<meta name="robots" property="robots" content="index, follow" />
	<meta name="keywords" property="keywords" content={keywords} />
	<meta name="image" property="image" content={image} />
	<meta name="url" property="url" content={url} />
	<meta name="type" property="type" content={type} />
	<meta name="logo" property="logo" content={logo} />

	<meta name="og:title" property="og:title" content={title} />
	<meta name="og:description" property="og:description" content={description} />
	<meta
		name="og:image"
		property="og:image"
		content="https://my-decaf-life.com/images/logo_twitter.jpeg"
	/>
	<meta name="og:url" property="og:url" content={url} />
	<meta name="og:type" property="og:type" content={type} />
	<meta name="og:logo" property="og:logo" content={logo} />

	<meta name="twitter:card" property="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" property="twitter:title" content={title} />
	<meta name="twitter:description" property="twitter:description" content={description} />
	<meta name="twitter:image" property="twitter:image" content={image} />
	<meta name="twitter:url" property="twitter:url" content={url} />
</svelte:head>
