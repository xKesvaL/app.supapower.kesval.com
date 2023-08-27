export type Locale = 'en' | 'fr';

export interface Brand {
	name: string;
	url: string;
	logo: BrandLogo;
	color: BrandColor;
	author: BrandAuthor;
}

export interface BrandLogo {
	light: string;
	dark: string;
}

export type BrandColor = Record<ThemeColor, string>;

export interface BrandAuthor {
	name: string;
	url: string;
}

export type ThemeColor = 'primary' | 'secondary' | 'info' | 'danger' | 'success';

export type ThemeSize = 'sm' | 'md' | 'lg';

export interface FormattedZodError {
	[key: string]: {
		message: string;
	};
}
