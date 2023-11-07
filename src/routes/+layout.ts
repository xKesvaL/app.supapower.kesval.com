import '$lib/utils/i18n';
import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { PAGES } from '$lib/ROUTES';

export const load: LayoutLoad = async ({ url }) => {
	await waitLocale();

	const fRel = url.searchParams.get('frel') || PAGES._ROOT();

	return {
		url,
		fRel
	};
};
