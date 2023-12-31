<script lang="ts">
	import { navigating, page } from '$app/stores';

	import { onMount } from 'svelte';

	import { createDocStore, createUserStore } from 'firebase-svelte';
	import { app, auth, firestore } from '$lib/firebase/config';
	import { doc } from 'firebase/firestore';
	import { getAnalytics, type Analytics, setUserId, logEvent } from 'firebase/analytics';

	import '@kesval/design';
	import '$lib/styles/poppins.scss';
	import '$lib/styles/inter.scss';
	import '$lib/styles/main.scss';
	import '$lib/styles/nprogress.scss';
	import '../app.postcss';

	import { BRAND } from '$lib/config';
	import { locales } from 'svelte-i18n';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Loading from '$lib/containers/layout/Loading.svelte';

	import nprogress from 'nprogress';

	import Auth from '$lib/containers/auth/Auth.svelte';
	import type { UserDataStore } from '$lib/firebase/user/types';

	import FlowRegister from '$lib/containers/flows/flowRegister/FlowRegister.svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import WorkoutInProgress from '$lib/containers/workout/layout/WorkoutInProgress.svelte';
	import Overlay from '$lib/components/layout/Overlay.svelte';
	import { overlayShown } from '$lib/stores/overlay';

	import { createCurrentWorkoutStore } from '$lib/stores/currentWorkout/store';
	import type { CurrentWorkoutStore } from '$lib/stores/currentWorkout/types';

	import {
		setDisplayMode,
		type DisplayMode,
		setPromptEvent,
		setCurrentWorkout,
		setUserData,
		setUser,
		setOnline,
		setAnalytics,
		setPerformance,
		setAppCheck
	} from '$lib/utils/context';

	import { getPerformance, type FirebasePerformance } from 'firebase/performance';
	import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, type ReportCallback } from 'web-vitals';
	import {
		initializeAppCheck,
		type AppCheck,
		ReCaptchaEnterpriseProvider
	} from 'firebase/app-check';

	nprogress.configure({ minimum: 0.2, easing: 'ease', speed: 250 });
	$: $navigating ? nprogress.start() : nprogress.done();

	///////////////////////////////////////
	///////////////////////////////////////
	//////////
	//////////   FIREBASE DATA
	//////////
	///////////////////////////////////////
	///////////////////////////////////////

	const user = createUserStore(auth);

	let userData: UserDataStore;
	let currentWorkout: CurrentWorkoutStore;

	$: if ($user) {
		userData = createDocStore(firestore, doc(firestore, 'users', $user.uid));
		currentWorkout = createCurrentWorkoutStore($user.uid);
	}

	$: setUser(user);
	$: setUserData(userData);
	$: setCurrentWorkout(currentWorkout);
	$: currentWorkoutDoc = currentWorkout?.workoutDoc;
	// VIEW TRANSITION API

	setupViewTransition();

	///////////////////////////////////////
	///////////////////////////////////////
	//////////
	//////////   CONTEXTS
	//////////
	///////////////////////////////////////
	///////////////////////////////////////

	const onBeforeInstallPrompt = (e: Event) => {
		e.preventDefault();
		setPromptEvent(e);
	};

	const windowOnline = () => {
		online = true;
	};

	const windowOffline = () => {
		online = false;
	};

	const sendToGoogleAnalytics: ReportCallback = ({ name, delta, value, id }) => {
		logEvent(analytics, name, {
			value: delta,
			metric_id: id,
			metric_value: value,
			metric_delta: delta
		});
	};

	let online = true;
	let displayMode: DisplayMode = 'browser';
	let analytics: Analytics;
	let performance: FirebasePerformance;
	let appCheck: AppCheck;

	onMount(() => {
		window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
			displayMode = e.matches ? 'standalone' : 'browser';
		});

		analytics = getAnalytics(app);
		performance = getPerformance(app);
		appCheck = initializeAppCheck(app, {
			provider: new ReCaptchaEnterpriseProvider('6LfYs8ooAAAAALiN97IX3qkZeYvlqlnsJVwr7Qyb'),
			isTokenAutoRefreshEnabled: true
		});

		onCLS(sendToGoogleAnalytics);
		onFCP(sendToGoogleAnalytics);
		onFID(sendToGoogleAnalytics);
		onLCP(sendToGoogleAnalytics);
		onTTFB(sendToGoogleAnalytics);
		onINP(sendToGoogleAnalytics);
	});

	$: setDisplayMode(displayMode);
	$: setAnalytics(analytics);
	$: if (analytics && $user) {
		setUserId(analytics, $user?.uid);
	}
	$: setPerformance(performance);
	$: setOnline(online);
	$: setAppCheck(appCheck);
</script>

<svelte:window
	on:beforeinstallprompt={onBeforeInstallPrompt}
	on:online={windowOnline}
	on:offline={windowOffline}
/>

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

<div class="root">
	{#if $overlayShown}
		<Overlay />
	{/if}
	{#if $user}
		<!-- System loaded & User logged in -->
		{#if $userData && $userData.workout.frequency !== undefined}
			<!-- User logged-in & Basic informations entered & loaded -->
			<Navigation />

			<main class="wrapper">
				<slot />
			</main>

			<!-- Workout in Progress reminder -->
			<!-- Shown if not in /workout/log[/...] or /settings[/...] -->
			{#if !$page.url.pathname.startsWith('/workout/log') && !$page.url.pathname.startsWith('/settings') && !$page.url.pathname.startsWith('/admin') && $currentWorkoutDoc}
				<WorkoutInProgress />
			{:else if $currentWorkoutDoc === undefined || $currentWorkoutDoc}
				<!-- 
					If current workout is loading or exists but is in the pages cited before,
					we leave it in the DOM to provide a smooth animation and let the discard modal work
				-->
				<WorkoutInProgress shown={false} />
			{/if}
		{:else if $userData === undefined}
			<!-- User logged-in & Basic informations loading -->
			<main>
				<Loading />
			</main>
		{:else}
			<!-- User logged-in & Basic informations not entered -->
			<main>
				<FlowRegister />
			</main>
		{/if}
	{:else if $user === undefined}
		<!-- Auth System loading -->
		<main>
			<Loading />
		</main>
	{:else}
		<main>
			<!-- Authentication -->
			<Auth />
		</main>
	{/if}
</div>

<style lang="scss">
	.root {
		@include mq(lg) {
			display: flex;
			align-items: flex-start;
		}

		main {
			flex: 1;
		}
	}
</style>
