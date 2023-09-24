import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../config';
import type { Workout } from './types';

export const createCurrentWorkout = async (
	uid: string,
	workout: Workout = { exercises: [], startDate: new Date().toISOString(), endDate: null }
) => {
	await setDoc(doc(firestore, 'workout', uid), workout);
};

export const deleteCurrentWorkout = async (uid: string) => {
	await deleteDoc(doc(firestore, 'workout', uid));
};
