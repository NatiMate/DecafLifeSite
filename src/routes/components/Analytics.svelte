<script lang="ts">
</script>

<svelte:head>
	{#if true}
		<!-- Google Analytics Code -->
		<!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-7WT7KNJNYZ"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'G-7WT7KNJNYZ');
		</script>
		<script>
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
