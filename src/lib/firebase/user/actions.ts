import { writeBatch, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config';
import type { UserData, UserDataWorkout } from './types';
import type { Locale } from '$lib/typings/standard';

const defaultUserData: Omit<UserData, 'uid' | 'username' | 'lang' | 'workout'> = {
	units: {
		bodyMeasurements: 'cm',
		distance: 'km',
		weight: 'kg'
	},
	privateData: {
		birthdate: null,
		sex: null
	},
	profile: { biography: '' }
};

const isUsernameUnique = async (username: string): Promise<boolean> => {
	return !(await getDoc(doc(firestore, 'usernames', username))).exists();
};

interface SetUserDataFunctionData {
	uid: string;
	username: string;
	workout: UserDataWorkout;
	lang: Locale;
}

const setUserData = async (data: SetUserDataFunctionData) => {
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

export { isUsernameUnique, setUserData };
