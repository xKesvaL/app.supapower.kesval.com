import type { Locale } from '$lib/typings/standard';

export interface UserData {
	uid: string;
	username: string;
	lang: Locale;
	workout: UserDataWorkout;
	units: UserDataUnits;
	profile: UserDataProfile;
	privateData: UserDataPrivate;
}

export interface UserDataWorkout {
	type: WorkoutType;
	frequency: 2 | 3 | 4 | 5 | 6;
}

export const workoutTypes = ['powerlifting', 'powerbuilding', 'bodybuilding'] as const;

export type WorkoutType = (typeof workoutTypes)[number];

export interface UserDataUnits {
	weight: 'kg' | 'lb';
	distance: 'km' | 'mi';
	bodyMeasurements: 'cm' | 'in';
}

export interface UserDataProfile {
	biography: string;
}

export interface UserDataPrivate {
	sex: 'male' | 'female' | 'other' | null;
	birthdate: string | null;
}
