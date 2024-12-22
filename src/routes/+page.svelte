<script>
	import Benefits from './components/Benefits.svelte';
	import Cta from './components/Cta.svelte';
	import Headline from './components/Headline.svelte';
	import ScreenPreviews from './components/ScreenPreviews.svelte';
	import Seo from './components/Seo.svelte';
	import Testimonials from './components/Testimonials.svelte';

	$effect(() => {
		const hash = window.location.hash;
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
</script>

<Seo
	title="My Decaf Life | Quit caffeine & coffee for better sleep and health."
	image="https://my-decaf-life.com/favicon.webp"
	description="Stop caffeine & coffee for a better life."
	type="Website"
	keywords="quit coffee, quite caffeine, stop coffee, bad sleep, better sleep, stop caffeine, decaf, caffeine, quit, better life, health, wellness, lifestyle, coffee, tea, energy, focus, productivity, sleep, anxiety, depression, withdrawal, addiction, natural, alternative, healthy, lifestyle change, natural energy, no caffeine, no coffee, no tea, no energy drinks"
	logo="https://my-decaf-life.com/favicon.webp"
/>

<Headline />
<Benefits />
<ScreenPreviews />
<Testimonials />
<Cta />
