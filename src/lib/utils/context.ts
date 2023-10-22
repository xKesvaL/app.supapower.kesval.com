import type { UserStore, UserStoreContext } from '$lib/firebase/auth/types';
import type { UserDataStore, UserDataStoreContext } from '$lib/firebase/user/types';
import type {
	CurrentWorkoutStore,
	CurrentWorkoutStoreContext
} from '$lib/stores/currentWorkout/types';
import { getContext, setContext } from 'svelte';

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
