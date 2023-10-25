import type { UserStore, UserStoreContext } from '$lib/firebase/auth/types';
import type { UserDataStore, UserDataStoreContext } from '$lib/firebase/user/types';
import type {
	CurrentWorkoutStore,
	CurrentWorkoutStoreContext,
	ExerciseStore
} from '$lib/stores/currentWorkout/types';
import type { Analytics } from 'firebase/analytics';
import { getContext, setContext } from 'svelte';
import type { FirebasePerformance } from 'firebase/performance';
import type { AppCheck } from 'firebase/app-check';

export const contextKeys = [
	'currentWorkout',
	'user',
	'userData',
	'installPromptEvent',
	'displayMode',
	'online'
] as const;

export type ContextKey = (typeof contextKeys)[number];

export type DisplayMode = 'browser' | 'standalone' | 'fullscreen';

export const setToContext = <T>(key: ContextKey, value: T) => {
	return setContext<T>(key, value);
};

export const getFromContext = <T>(key: ContextKey) => {
	return getContext<T>(key);
};

export const getUser = () => {
	return getContext<UserStoreContext>('user' satisfies ContextKey);
};

export const setUser = (user: UserStore | UserStoreContext) => {
	return setContext<UserStore | UserStoreContext>('user', user);
};

export const getUserData = () => {
	return getContext<UserDataStoreContext>('userData' satisfies ContextKey);
};

export const setUserData = (userData: UserDataStore | UserDataStoreContext) => {
	return setContext<UserDataStore | UserDataStoreContext>('userData', userData);
};

export const getCurrentWorkout = (): CurrentWorkoutStoreContext => {
	return getContext<CurrentWorkoutStoreContext>('currentWorkout' satisfies ContextKey);
};

export const setCurrentWorkout = (
	currentWorkout: CurrentWorkoutStore | CurrentWorkoutStoreContext
) => {
	return setContext<CurrentWorkoutStore | CurrentWorkoutStoreContext>(
		'currentWorkout',
		currentWorkout
	);
};

export const getPromptEvent = () => {
	return getContext<Event | undefined>('installPromptEvent' satisfies ContextKey);
};

export const setPromptEvent = (event: Event) => {
	return setContext<Event>('installPromptEvent', event);
};

export const getDisplayMode = () => {
	return getContext<DisplayMode>('displayMode' satisfies ContextKey);
};

export const setDisplayMode = (mode: DisplayMode) => {
	return setContext<DisplayMode>('displayMode', mode);
};

export const getOnline = () => {
	return getContext<boolean>('online' satisfies ContextKey);
};

export const setOnline = (online: boolean) => {
	return setContext<boolean>('online', online);
};

export const getExercise = (exerciseId: string) => {
	return getContext<ExerciseStore>(exerciseId);
};

export const setExercise = (exerciseId: string, exercise: ExerciseStore) => {
	return setContext<ExerciseStore>(exerciseId, exercise);
};

export const setAnalytics = (analytics: Analytics) => {
	return setContext<Analytics>('analytics', analytics);
};

export const getAnalytics = () => {
	return getContext<Analytics>('analytics');
};

export const setPerformance = (performance: FirebasePerformance) => {
	return setContext<FirebasePerformance>('performance', performance);
};

export const getPerformance = () => {
	return getContext<FirebasePerformance>('performance');
};

export const setAppCheck = (appCheck: AppCheck) => {
	return setContext<AppCheck>('appCheck', appCheck);
};

export const getAppCheck = () => {
	return getContext<AppCheck>('appCheck');
};
