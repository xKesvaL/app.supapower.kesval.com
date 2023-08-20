import type { Locale, Brand } from './types';

export const DEFAULT_LOCALE: Locale = 'en';

export const BRAND = {
	name: 'KesvaL',
	url: 'https://starter.kesval.com',
	author: {
		name: 'Kesval',
		url: 'https://kesval.com'
	},
	logo: {
		light: '/images/logos/logo.png',
		dark: '/images/logos/logo.png'
	},
	color: {
		primary: '#6c20df',
		secondary: '#df20b9',
		accent: '#19b357'
	}
} as const satisfies Brand;
