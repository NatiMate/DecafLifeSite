interface GtagConsentArg {
	ad_user_data?: 'granted' | 'denied';
	ad_personalization?: 'granted' | 'denied';
	ad_storage?: 'granted' | 'denied';
	analytics_storage?: 'granted' | 'denied';
}

interface Window {
	dataLayer: IArguments[];
	gtag(command: 'consent', action: 'update', args: GtagConsentArg): void;
	gtag(command: 'config' | 'js', targetId: string | Date): void;
}

declare function gtag(
	command: 'consent' | 'config' | 'js',
	action: 'update' | string | Date,
	args?: GtagConsentArg
): void;
