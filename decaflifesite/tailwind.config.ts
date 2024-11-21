import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Outfit', 'sans-serif']
			},
			colors: {
				primary: {
					50: '#FAF5F2',
					100: '#F7EFE9',
					200: '#E8CFC0',
					300: '#DBB099',
					400: '#C88A6F',
					500: '#BC6F53', // Default
					600: '#AF5C47',
					700: '#91493D',
					800: '#763D36',
					900: '#60342E',
					950: '#331917'
				},
				secondary: {
					50: '#F4F7F2',
					100: '#E6EBE0',
					200: '#CBD7C3',
					300: '#A6BA9B',
					400: '#6E8861',
					500: '#668E52', // Default
					600: '#45603B',
					700: '#364D2F',
					800: '#2C3E27',
					900: '#253321',
					950: '#141C12'
				},
				text: {
					50: '#F6F7F7',
					100: '#E2E5E3',
					200: '#C4CBC9',
					300: '#9FA9A6',
					400: '#7A8782',
					500: '#606C69',
					600: '#4C5553',
					700: '#3A413F',
					800: '#353A39',
					900: '#2E3331',
					950: '#1B1B1A'
				},
				// Specific utility colors
				warning: '#CF4414',
				'dark-border': '#EEEEEE',
				border: '#F6F6F6',
				'almost-white': '#FCF8F7',
				white: '#FFFFFF'
			}
		}
	},
	plugins: []
};

export default config;
