<script lang="ts">
	import type { LayoutData } from './$types';
	import { navigating } from '$app/stores';

	import '@kesval/design';
	import '$lib/styles/nprogress.scss';
	import '$lib/styles/main.scss';

	import { BRAND } from '$lib/config';
	import { locales } from 'svelte-i18n';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import BackToTopButton from '$lib/components/layout/BackToTopButton.svelte';

	import { fly } from 'svelte/transition';

	import nprogress from 'nprogress';
	nprogress.configure({ minimum: 0.2, easing: 'ease', speed: 600 });
	$: $navigating ? nprogress.start() : nprogress.done();

	export let data: LayoutData;
</script>

<svelte:head>
	<meta name="theme-color" content={BRAND.color.primary} />
	<meta name="copyright" content={BRAND.author.name} />
	<meta name="og:site_name" content={BRAND.name} />

	<!-- Href langs -->
	<link rel="alternate" hreflang="x-default" href={BRAND.url} />
	{#each $locales as locale}
		<link rel="alternate" hreflang={locale} href={BRAND.url + '?lang=' + locale} />
	{/each}
</svelte:head>

<Navigation />

{#key data.url.pathname}
	<main in:fly={{ y: 100, duration: 300, delay: 300 }} out:fly={{ y: -100, duration: 300 }}>
		<slot />
	</main>
{/key}

<BackToTopButton />
<Footer />
