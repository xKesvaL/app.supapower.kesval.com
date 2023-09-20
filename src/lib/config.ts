import type { Locale, Brand, Routes } from './typings/standard';

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

export const ROUTES = {
	home: '/',
	profile: '/profile',
	settings: '/settings',
	settingsAccount: '/settings/account',
	settingsLanguage: '/settings/language',
	settingsProfile: '/settings/profile',
	settingsTheme: '/settings/theme',
	settingsUnits: '/settings/units',
	settingsWorkouts: '/settings/workouts',
	workout: '/workout',
	workoutSelf: '/workout/self',
	workoutCommunity: '/workout/community',
	workoutLog: '/workout/log',
	forgotpassword: '/forgot-password'
} as const satisfies Routes;
