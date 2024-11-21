import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Outfit', 'sans-serif']
			}
		}
	},
	plugins: []
};

export default config;
