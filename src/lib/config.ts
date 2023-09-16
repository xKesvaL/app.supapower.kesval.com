import type { Locale, Brand } from './typings/standard';

export const DEFAULT_LOCALE: Locale = 'en';

export const BRAND = {
	name: 'SupaPower',
	url: 'https://app.supapower.kesval.com',
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
		info: '',
		danger: '',
		success: ''
	}
} as const satisfies Brand;
