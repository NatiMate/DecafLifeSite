<script lang="ts">
	import { browser } from '$app/environment';
	import { analyticsCookies, trackingCookies } from '$lib/stores/analyticsStores';

	$: {
		// If a cookie consent banner gets clicked then the head script will not trigger unless we do it here
		if (browser) {
			if (typeof gtag === 'undefined') {
				// Pass if gtag is not defined
			} else if ($analyticsCookies || $trackingCookies) {
				gtag('consent', 'default', {
					ad_user_data: 'denied',
					ad_personalization: 'denied',
					ad_storage: 'denied',
					analytics_storage: 'denied'
				});
				gtag('consent', 'update', {
					ad_user_data: $trackingCookies ? 'granted' : 'denied',
					ad_personalization: $trackingCookies ? 'granted' : 'denied',
					ad_storage: $trackingCookies ? 'granted' : 'denied',
					analytics_storage: $analyticsCookies ? 'granted' : 'denied'
				});
			}
		}
	}
</script>

<svelte:head>
	<!-- Google Analytics Code Definitions -->
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
	</script>

	<!-- End Google Analytics Code Definitions -->
	{#if $analyticsCookies || $trackingCookies}
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('consent', 'default', {
				ad_user_data: 'denied',
				ad_personalization: 'denied',
				ad_storage: 'denied',
				analytics_storage: 'denied'
			});
		</script>
		<!-- Trigger the gtag only after the default settings -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-7WT7KNJNYZ"></script>
		<script>
			gtag('js', new Date());
			gtag('config', 'G-7WT7KNJNYZ');
			let lastUrlGoogleAnalytics = location.href;
			new MutationObserver(() => {
				const url = location.href;
				if (
					url !== lastUrlGoogleAnalytics &&
					url.split('#')[0] !== lastUrlGoogleAnalytics.split('#')[0]
				) {
					lastUrlGoogleAnalytics = url;
					gtag('js', new Date());
					gtag('config', 'G-7WT7KNJNYZ');
				}
			}).observe(document, { subtree: true, childList: true });
		</script>
		<!-- End Google Analytics Code -->
	{/if}
</svelte:head>
