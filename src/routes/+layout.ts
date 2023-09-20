import '$lib/utils/i18n';
import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { ROUTES } from '$lib/config';

export const load: LayoutLoad = async ({ url }) => {
	await waitLocale();

	const fRel = url.searchParams.get('frel') || ROUTES.home;

	return {
		url,
		fRel
	};
};
