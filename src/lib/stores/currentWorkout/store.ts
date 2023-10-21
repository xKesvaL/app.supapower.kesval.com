import { firestore } from '$lib/firebase/config';
import type { CurrentWorkoutStore, Workout, WorkoutExercise } from './types';
import { createCollectionStore, createDocStore } from 'firebase-svelte';
import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';

import { v4 } from 'uuid';

export const createCurrentWorkoutStore = (uid: string): CurrentWorkoutStore => {
	const workoutDocStore = createDocStore<Workout>(firestore, doc(firestore, 'workout', uid));

	const exercisesCollectionStore = createCollectionStore<WorkoutExercise>(
		firestore,
		collection(firestore, 'workout', uid, 'exercises')
	);

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
		await exercisesCollectionStore.add(`${exercise.exerciseName}-${v4()}`, exercise);
	};

	const addExercises = async (exercises: WorkoutExercise[]) => {
		const batch = writeBatch(firestore);
		exercises.forEach((exercise) => {
			const ref = doc(firestore, 'workout', uid, 'exercises', `${exercise.exerciseName}-${v4()}`);
			batch.set(ref, exercise);
		});
		await batch.commit();
	};

	return {
		workoutDoc: workoutDocStore,
		createWorkout,
		deleteWorkout,
		exercisesCol: exercisesCollectionStore,
		addExercise,
		addExercises
	};
};
