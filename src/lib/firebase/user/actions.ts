import { writeBatch, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../config';
import type { UserData, UserDataWorkout } from './types';
import type { Locale } from '$lib/typings/standard';

const defaultUserData: Omit<UserData, 'uid' | 'username' | 'lang' | 'workout'> = {
	units: {
		bodyMeasurements: 'cm',
		distance: 'km',
		weight: 'kg'
	},
	type: 'regular',
	profile: { biography: '', public: false }
};

const isUsernameUnique = async (username: string): Promise<boolean> => {
	return !(await getDoc(doc(firestore, 'usernames', username))).exists();
};

interface CreateUserDataFunctionData {
	uid: string;
	username: string;
	workout: UserDataWorkout;
	lang: Locale;
}

const createUserData = async (data: CreateUserDataFunctionData) => {
	const userDoc = doc(firestore, 'users', data.uid);
	const usernameDoc = doc(firestore, 'usernames', data.username);

	const batch = writeBatch(firestore);
	batch.set(userDoc, {
		...defaultUserData,
		...data
	});
	batch.set(usernameDoc, {
		uid: data.uid
	});

	await batch.commit();
};

const updateUserData = async (uid: string, data: Partial<UserData>) => {
	await updateDoc(doc(firestore, 'users', uid), data);
};

export { isUsernameUnique, createUserData, updateUserData };
