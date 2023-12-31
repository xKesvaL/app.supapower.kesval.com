import type { Locale } from '$lib/typings/standard';
import type { Readable } from 'svelte/store';

export interface UserData {
	uid: string;
	username: string;
	type: UserType;
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

export type UserType = (typeof userTypes)[number];

export const userTypes = ['regular', 'beta', 'trainer', 'creator', 'admin'] as const;

export interface UserDataUnits {
	weight: (typeof weightUnits)[number];
	distance: (typeof distanceUnits)[number];
	bodyMeasurements: (typeof measurementUnits)[number];
}

export const weightUnits = ['kg', 'lb'] as const;

export const distanceUnits = ['km', 'mi'] as const;

export const measurementUnits = ['cm', 'in'] as const;

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
