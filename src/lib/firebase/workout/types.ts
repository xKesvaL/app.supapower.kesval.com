import type { ExerciseName } from '$lib/data/types/exerciseTypes';
import type { Readable } from 'svelte/store';

export interface WorkoutExerciseSet {
	type: 'warmup' | 'working';
	weight: number | null;
	reps: number | null;
	rpe: number | null;
	done: boolean;
	timer: number;
}

export type WorkoutExerciseSetType = WorkoutExerciseSet['type'];

export interface WorkoutExercise {
	exerciseName: ExerciseName;
	sets: WorkoutExerciseSet[];
}

export interface PredefinedWorkout {
	exercises: WorkoutExercise[];
}

export interface Workout extends PredefinedWorkout {
	startDate: string;
	endDate: string | null;
}

export type WorkoutStore = Readable<Workout | undefined | null>;

export type WorkoutStoreContext = Readable<Workout>;

export interface WorkoutStats {
	sets: number;
	volume: number;
	avgRpe: number;
}
