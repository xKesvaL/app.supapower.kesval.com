import type { ExerciseName } from '$lib/data/types/exerciseTypes';
import type { CollectionStore } from 'firebase-svelte/dist/firestore/stores';
import type { Readable } from 'svelte/store';

export type ExercisesStore = Readable<(WorkoutExercise & { id: string })[] | undefined | null>;

export interface ExerciseStore {
	id: string;
	exerciseSets: CollectionStore<WorkoutExerciseSet & { id: string }>;
	addExerciseSet: (id: string) => Promise<void>;
	removeExerciseSet: (id: string) => Promise<void>;
	updateExerciseSet: (id: string, data: Partial<WorkoutExerciseSet>) => Promise<void>;
}

export type ExercisesStoreContext = Readable<WorkoutExercise[]>;

export interface CurrentWorkoutStore {
	workoutCol: WorkoutColStore;
	workoutDoc: WorkoutDocStore;
	createWorkout: (workout?: Workout) => Promise<string>;
	deleteWorkout: () => Promise<void>;
	exercisesCol: ExercisesStore;
	addExercise: (index: number, exercise: WorkoutExercise) => Promise<void>;
	addExercises: (index: number, exercises: WorkoutExercise[]) => Promise<void>;
	removeExercise: (exerciseId: string) => Promise<void>;
}

export interface CurrentWorkoutStoreContext extends CurrentWorkoutStore {
	workoutCol: WorkoutColStoreContext;
	workoutDoc: WorkoutDocStoreContext;
}

export interface WorkoutExerciseSet {
	type: 'warmup' | 'working';
	weight: number | null;
	reps: number | null;
	rpe: number | null;
	done: boolean;
}

export type WorkoutExerciseSetType = WorkoutExerciseSet['type'];

export interface WorkoutExercise {
	exerciseName: ExerciseName;
	timer: number;
}

export interface PredefinedWorkout {
	exercises: WorkoutExercise[];
}

export interface Workout {
	startDate: string;
	endDate: string | null;
}

export type WorkoutDocStore = Readable<Workout | undefined | null>;

export type WorkoutDocStoreContext = Readable<Workout>;

export type WorkoutColStore = Readable<(Workout & { id: string })[] | undefined | null>;

export type WorkoutColStoreContext = Readable<(Workout & { id: string })[]>;

export interface WorkoutStats {
	sets: number;
	volume: number;
	avgRpe: number;
}
