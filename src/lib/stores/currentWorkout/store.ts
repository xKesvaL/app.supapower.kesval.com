import { firestore } from '$lib/firebase/config';
import type {
	CurrentWorkoutStore,
	ExerciseStore,
	Workout,
	WorkoutExercise,
	WorkoutExerciseSet
} from './types';
import { createCollectionStore, createDocStore } from 'firebase-svelte';
import { collection, deleteDoc, doc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';

import { v4 } from 'uuid';

export const createCurrentWorkoutStore = (uid: string): CurrentWorkoutStore => {
	const workoutDocStore = createDocStore<Workout>(firestore, doc(firestore, 'workout', uid));

	const exercisesCollectionStore = createCollectionStore<WorkoutExercise & { id: string }>(
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

	return {
		workoutDoc: workoutDocStore,
		createWorkout,
		deleteWorkout,
		exercisesCol: exercisesCollectionStore,
		addExercise,
		addExercises,
		removeExercise
	};
};

export const createExerciseStore = (uid: string, exerciseId: string): ExerciseStore => {
	const exerciseRef = doc(firestore, 'workout', uid, 'exercises', exerciseId);
	const exerciseDoc = createDocStore<WorkoutExercise>(firestore, exerciseRef);
	const exerciseSets = createCollectionStore<WorkoutExerciseSet & { id: string }>(
		firestore,
		collection(exerciseRef, 'sets')
	);

	const addExerciseSet = async (id: string) => {
		await setDoc(doc(exerciseRef, 'sets', id), {
			type: 'working',
			weight: null,
			reps: null,
			rpe: null,
			done: false
		} satisfies WorkoutExerciseSet);
	};

	const removeExerciseSet = async (id: string) => {
		await deleteDoc(doc(exerciseRef, 'sets', id));
	};

	const updateExerciseSet = async (id: string, data: Partial<WorkoutExerciseSet>) => {
		await updateDoc(doc(exerciseRef, 'sets', id), data as never);
	};

	return {
		exerciseDoc,
		id: exerciseId,
		exerciseSets,
		addExerciseSet,
		removeExerciseSet,
		updateExerciseSet
	};
};
