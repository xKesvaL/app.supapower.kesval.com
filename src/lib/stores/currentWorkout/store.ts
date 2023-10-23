import { firestore } from '$lib/firebase/config';
import type {
	CurrentWorkoutStore,
	ExerciseStoreContext,
	Workout,
	WorkoutExercise,
	WorkoutExerciseSet
} from './types';
import { createCollectionStore, createDocStore } from 'firebase-svelte';
import { collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { derived } from 'svelte/store';

import { v4 } from 'uuid';

export const createCurrentWorkoutStore = (uid: string): CurrentWorkoutStore => {
	const workoutDocStore = createDocStore<Workout>(firestore, doc(firestore, 'workout', uid));

	const exercisesCollectionStore = createCollectionStore<WorkoutExercise & { id: string }>(
		firestore,
		collection(firestore, 'workout', uid, 'exercises')
	);

	const volumeDone = derived(exercisesCollectionStore, ($exercises) => {
		return $exercises?.reduce((acc, exercise) => {
			return (
				acc +
				exercise.sets.reduce((acc, set) => {
					return acc + (set.done ? (set.weight || 0) * (set.reps || 0) : 0);
				}, 0)
			);
		}, 0);
	});

	const setsDone = derived(exercisesCollectionStore, ($exercises) => {
		return $exercises?.reduce((acc, exercise) => {
			return (
				acc +
				exercise.sets.reduce((acc, set) => {
					return acc + (set.done ? 1 : 0);
				}, 0)
			);
		}, 0);
	});

	///////////////////////////////////////
	///////////////////////////////////////
	//////////
	//////////   WORKOUT STORE
	//////////
	///////////////////////////////////////
	///////////////////////////////////////

	const createWorkout = async (
		workout: Workout = { startDate: new Date().toISOString(), endDate: null }
	) => {
		await workoutDocStore.set(workout);
	};

	const deleteWorkout = async () => {
		await deleteDoc(workoutDocStore.ref!);
	};

	///////////////////////////////////////
	///////////////////////////////////////
	//////////
	//////////   EXERCISES STORE
	//////////
	///////////////////////////////////////
	///////////////////////////////////////

	const addExercise = async (exercise: WorkoutExercise) => {
		await exercisesCollectionStore.add(`${exercise.exerciseName}-${v4()}`, exercise as never);
	};

	const addExercises = async (exercises: WorkoutExercise[]) => {
		const batch = writeBatch(firestore);
		exercises.forEach((exercise) => {
			const ref = doc(firestore, 'workout', uid, 'exercises', `${exercise.exerciseName}-${v4()}`);
			batch.set(ref, exercise);
		});
		await batch.commit();
	};

	const removeExercise = async (exerciseId: string) => {
		await deleteDoc(doc(firestore, 'workout', uid, 'exercises', exerciseId));
	};

	const addExerciseSet = async (exerciseId: string, currentSets: WorkoutExerciseSet[]) => {
		const exerciseRef = doc(firestore, 'workout', uid, 'exercises', exerciseId);

		await updateDoc(exerciseRef, {
			sets: [
				...currentSets,
				{
					type: 'working',
					weight: null,
					reps: null,
					rpe: null,
					done: false
				} satisfies WorkoutExerciseSet
			]
		});
	};

	const removeExerciseSet = async (
		exerciseId: string,
		currentSets: WorkoutExerciseSet[],
		index: number
	) => {
		const exerciseRef = doc(firestore, 'workout', uid, 'exercises', exerciseId);

		await updateDoc(exerciseRef, {
			sets: currentSets.filter((_, i) => i !== index)
		});
	};

	return {
		workoutDoc: workoutDocStore,
		createWorkout,
		deleteWorkout,
		exercisesCol: exercisesCollectionStore,
		addExercise,
		addExercises,
		removeExercise,
		addExerciseSet,
		removeExerciseSet,
		volumeDone,
		setsDone
	};
};

export const createExerciseStore = (uid: string, exerciseId: string) => {
	const exerciseDoc = createDocStore<WorkoutExercise>(
		firestore,
		doc(firestore, 'workout', uid, 'exercises', exerciseId)
	) as unknown as ExerciseStoreContext;

	return {
		exerciseDoc
	};
};
