import type { ExerciseName } from '$lib/data/types/exerciseTypes';
import type { Readable } from 'svelte/store';

export interface WorkoutExerciseSet {
	type: 'warmup' | 'working';
	weight: number;
	weightType: 'static' | 'percentage';
	reps: number;
	rpe: number;
}

export interface WorkoutExercise {
	exerciseName: ExerciseName;
	sets: WorkoutExerciseSet[];
}

export interface Workout {
	exercises: WorkoutExercise[];
	startDate: string;
	endDate: string | null;
}

export type WorkoutStore = Readable<Workout | undefined | null>;

export type WorkoutStoreContext = Readable<Workout>;
