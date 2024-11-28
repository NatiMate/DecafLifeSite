declare module '@beyonk/gdpr-cookie-consent-banner' {
	import { SvelteComponentTyped } from 'svelte';

	export interface GdprBannerProps {
		cookieName?: string;
		description?: string;
	}

	export default class GdprBanner extends SvelteComponentTyped<GdprBannerProps> {}
}
