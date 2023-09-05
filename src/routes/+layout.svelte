<script lang="ts">
	import type { LayoutData } from './$types';
	import { navigating } from '$app/stores';

	import { fly } from 'svelte/transition';
	import { setContext } from 'svelte';

	import { createDocStore, createUserStore } from 'firebase-svelte';
	import { auth, firestore } from '$lib/firebase/config';
	import { doc } from 'firebase/firestore';

	import '@kesval/design';
	import '$lib/styles/nprogress.scss';
	import '$lib/styles/main.scss';

	import { BRAND } from '$lib/config';
	import { locales } from 'svelte-i18n';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Loading from '$lib/containers/layout/Loading.svelte';

	import nprogress from 'nprogress';

	import Auth from '$lib/containers/auth/Auth.svelte';
	import type { UserData } from '$lib/firebase/user/types';
	import type { Readable } from 'svelte/store';

	import FlowRegister from '$lib/containers/flows/flowRegister/FlowRegister.svelte';
	import { onNavigate } from '$app/navigation';

	nprogress.configure({ minimum: 0.2, easing: 'ease', speed: 250 });
	$: $navigating ? nprogress.start() : nprogress.done();

	export let data: LayoutData;

	const user = createUserStore(auth);

	let userData: Readable<UserData>;

	$: if ($user) {
		userData = createDocStore(firestore, doc(firestore, 'users', $user.uid)) as Readable<UserData>;
	}

	$: setContext('user', user);
	$: setContext('userData', userData);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
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

<main>
	{#if $user}
		<!-- System loaded & User logged in -->
		{#if $userData && $userData.workout.frequency !== undefined}
			<!-- User logged-in & Basic informations entered & loaded -->
			<Navigation />

			<slot />
		{:else if $userData === undefined}
			<!-- User logged-in & Basic informations loading -->
			<Loading />
		{:else}
			<!-- User logged-in & Basic informations not entered -->
			<FlowRegister />
		{/if}
	{:else if $user === undefined}
		<!-- Auth System loading -->
		<Loading />
	{:else}
		<!-- Authentication -->
		<Auth />
	{/if}
</main>

<style lang="scss">
	main {
		@include mq(lg) {
			display: flex;
			align-items: flex-start;
		}
	}
</style>
