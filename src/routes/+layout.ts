import '$lib/utils/i18n';
import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	await waitLocale();

	const fRel = url.searchParams.get('frel') || '/';

	return {
		url,
		fRel
	};
};
