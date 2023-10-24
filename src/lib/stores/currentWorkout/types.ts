import type { ExerciseName } from '$lib/data/types/exerciseTypes';
import type { CollectionStore, DocStore } from 'firebase-svelte/dist/firestore/stores';
import type { Readable } from 'svelte/store';

export type ExercisesStore = Readable<(WorkoutExercise & { id: string })[] | undefined | null>;

export interface ExerciseStore {
	exerciseDoc: DocStore<WorkoutExercise>;
	id: string;
	exerciseSets: CollectionStore<WorkoutExerciseSet & { id: string }>;
	addExerciseSet: (id: string) => Promise<void>;
	removeExerciseSet: (id: string) => Promise<void>;
	updateExerciseSet: (id: string, data: Partial<WorkoutExerciseSet>) => Promise<void>;
}

export type ExercisesStoreContext = Readable<WorkoutExercise[]>;

export interface CurrentWorkoutStore {
	workoutDoc: WorkoutStore;
	createWorkout: (workout?: Workout) => Promise<void>;
	deleteWorkout: () => Promise<void>;
	exercisesCol: ExercisesStore;
	addExercise: (exercise: WorkoutExercise) => Promise<void>;
	addExercises: (exercises: WorkoutExercise[]) => Promise<void>;
	removeExercise: (exerciseId: string) => Promise<void>;
}

export interface CurrentWorkoutStoreContext extends CurrentWorkoutStore {
	workoutDoc: WorkoutStoreContext;
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

export type WorkoutStore = Readable<Workout | undefined | null>;

export type WorkoutStoreContext = Readable<Workout>;

export interface WorkoutStats {
	sets: number;
	volume: number;
	avgRpe: number;
}
