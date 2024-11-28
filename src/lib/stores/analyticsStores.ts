import { writable } from 'svelte/store';

// GDPR Cookies
export const necessaryCookies = writable(true);
export const analyticsCookies = writable(false);
export const trackingCookies = writable(false);
export const marketingCookies = writable(false);
