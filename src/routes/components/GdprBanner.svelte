<script>
	import { browser } from '$app/environment';
	import {
		analyticsCookies,
		marketingCookies,
		necessaryCookies,
		trackingCookies
	} from '$lib/stores/analyticsStores';
	import GdprBanner from '@beyonk/gdpr-cookie-consent-banner';
	import { onMount } from 'svelte';
	import './banner.css';
	function initAnalytics() {
		getGdprCookieAndSetStores();
	}

	function getGdprCookieAndSetStores() {
		const allCookies = decodeURIComponent(document.cookie).split('; ');
		let gdprCookie = allCookies.find((cookie) => cookie.startsWith('Gdpr Cookie='));
		if (gdprCookie) {
			const gdprCookieValue = gdprCookie.replace('Gdpr Cookie=', '');
			gdprCookie = JSON.parse(gdprCookieValue);
		}

		if (gdprCookie) {
			necessaryCookies.set(true);
			analyticsCookies.set(gdprCookie['choices']['analytics']);
			trackingCookies.set(gdprCookie['choices']['tracking']);
			marketingCookies.set(gdprCookie['choices']['marketing']);
		}
	}

	onMount(() => {
		if (browser) {
			getGdprCookieAndSetStores();
		}
	});
</script>

<GdprBanner
	cookieName="Gdpr Cookie"
	description="Our website uses cookies to improve your experience."
	on:analytics={initAnalytics}
/>
