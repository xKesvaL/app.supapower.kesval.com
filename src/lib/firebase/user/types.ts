import type { Locale } from '$lib/typings/standard';
import type { Readable } from 'svelte/store';

export interface UserData {
	uid: string;
	username: string;
	lang: Locale;
	workout: UserDataWorkout;
	units: UserDataUnits;
	profile: UserDataProfile;
}

export interface UserDataWorkout {
	type: WorkoutType;
	frequency: WorkoutFrequency;
}

export const workoutTypes = ['powerlifting', 'powerbuilding', 'bodybuilding'] as const;

export type WorkoutType = (typeof workoutTypes)[number];

export type WorkoutFrequency = 2 | 3 | 4 | 5 | 6;

export interface UserDataUnits {
	weight: 'kg' | 'lb';
	distance: 'km' | 'mi';
	bodyMeasurements: 'cm' | 'in';
}

export interface UserDataProfile {
	biography: string;
	public: boolean;
}

export interface UserDataPrivate {
	sex: 'male' | 'female' | 'other' | null;
	birthdate: string | null;
}

export type UserDataStore = Readable<UserData | undefined | null>;

export type UserDataStoreContext = Readable<UserData>;
