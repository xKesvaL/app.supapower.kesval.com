import { firestore } from '$lib/firebase/config';
import type {
	CurrentWorkoutStore,
	ExerciseStore,
	Workout,
	WorkoutExercise,
	WorkoutExerciseSet
} from './types';
import { createCollectionStore } from 'firebase-svelte';
import {
	DocumentReference,
	collection,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
	where,
	writeBatch
} from 'firebase/firestore';
import { derived } from 'svelte/store';

import { v4 } from 'uuid';

export const createCurrentWorkoutStore = (uid: string): CurrentWorkoutStore => {
	let workoutId: string | null = null;
	let workoutRef: DocumentReference | null = null;

	const workoutColStore = createCollectionStore<Workout & { id: string }>(
		firestore,
		collection(firestore, 'workout'),
		[where('endDate', '==', null), where('uid', '==', uid)]
	);

	const workoutDocStore = derived(workoutColStore, (workouts) => {
		if (workouts?.length) {
			return workouts[0];
		}
		return null;
	});

	workoutDocStore.subscribe((workout) => {
		workoutId = workout?.id ?? null;
		workoutRef = workout ? doc(firestore, 'workout', workout.id) : null;
	});

	const exercisesCollectionStore = createCollectionStore<WorkoutExercise & { id: string }>(
		firestore,
		collection(workoutRef, 'exercises')
	);

	///////////////////////////////////////
	///////////////////////////////////////
	//////////
	//////////   WORKOUT STORE
	//////////
	///////////////////////////////////////
	///////////////////////////////////////

	/**
	 *
	 * @returns {string} id of the workout
	 */
	const createWorkout = async (
		workout: Workout = { startDate: new Date().toISOString(), endDate: null }
	) => {
		const id = v4();
		await workoutColStore.add(id, workout as Workout & { id: string });
		return id;
	};

	const deleteWorkout = async () => {
		// await deleteDoc(workoutDocStore.ref!);
	};

	///////////////////////////////////////
	///////////////////////////////////////
	//////////
	//////////   EXERCISES STORE
	//////////
	///////////////////////////////////////
	///////////////////////////////////////

	const addExercise = async (index: number, exercise: WorkoutExercise) => {
		await exercisesCollectionStore.add(`${index}${v4()}`, exercise as never);
	};

	const addExercises = async (index: number, exercises: WorkoutExercise[]) => {
		const batch = writeBatch(firestore);
		exercises.forEach((exercise, i) => {
			const ref = doc(firestore, 'workout', workoutId, 'exercises', `${index + i}${v4()}`);
			batch.set(ref, exercise);
		});
		await batch.commit();
	};

	const removeExercise = async (exerciseId: string) => {
		await deleteDoc(doc(firestore, 'workout', workoutId, 'exercises', exerciseId));
	};

	return {
		workoutCol: workoutColStore,
		workoutDoc: workoutDocStore,
		createWorkout,
		deleteWorkout,
		exercisesCol: exercisesCollectionStore,
		addExercise,
		addExercises,
		removeExercise
	};
};

export const createExerciseStore = (workoutId: string, exerciseId: string): ExerciseStore => {
	const exerciseRef = doc(firestore, 'workout', workoutId, 'exercises', exerciseId);
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
		id: exerciseId,
		exerciseSets,
		addExerciseSet,
		removeExerciseSet,
		updateExerciseSet
	};
};
