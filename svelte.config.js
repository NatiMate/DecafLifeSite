import { default as autoAdapter } from '@sveltejs/adapter-auto';
import { default as nodeAdapter } from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const dev = process.env.NODE_ENV === 'development';

console.log('ENV: ', process.env.NODE_ENV);

const config = {
	onwarn: (warning, handler) => {
		if (warning.code === 'css-unused-selector') {
			return;
		}
		handler(warning);
	},
	preprocess: vitePreprocess(),
	kit: {
		adapter: dev ? autoAdapter() : nodeAdapter()
	}
};
export default config;
