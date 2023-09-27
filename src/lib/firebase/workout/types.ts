import type { ExerciseName } from '$lib/data/types/exerciseTypes';
import type { Readable } from 'svelte/store';

export interface WorkoutExerciseSet {
	type: 'warmup' | 'working';
	weight: number | null;
	weightType: 'static' | 'percentage';
	reps: number | null;
	rpe: number | null;
	done: boolean;
}

export type WorkoutExerciseSetType = WorkoutExerciseSet['type'];

export type WorkoutExerciseWeightType = WorkoutExerciseSet['weightType'];

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
