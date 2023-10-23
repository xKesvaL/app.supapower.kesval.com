import type { ExerciseName } from '$lib/data/types/exerciseTypes';
import type { DocStore } from 'firebase-svelte/dist/firestore/stores';
import type { Readable } from 'svelte/store';

export type ExercisesStore = Readable<(WorkoutExercise & { id: string })[] | undefined | null>;

export interface ExerciseStore {
	exerciseDoc: DocStore<WorkoutExercise>;
	id: string;
	addExerciseSet: (currentSets: WorkoutExerciseSet[]) => Promise<void>;
	removeExerciseSet: (
		currentSets: WorkoutExerciseSet[],
		index: number
	) => Promise<void>;
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
	volumeDone: Readable<number>;
	setsDone: Readable<number>;
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
	sets: WorkoutExerciseSet[];
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
