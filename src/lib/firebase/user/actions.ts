import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
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
	return (
		(
			await getDocs(
				query(collection(firestore, 'users'), where('username', '==', username.toLowerCase()))
			)
		).docs.length === 0
	);
};

interface SetUserDataFunctionData {
	uid: string;
	username: string;
	workout: UserDataWorkout;
	lang: Locale;
}

const setUserData = async (data: SetUserDataFunctionData) => {
	setDoc(doc(firestore, 'users', data.uid), {
		...defaultUserData,
		...data
	});
};

export { isUsernameUnique, setUserData };
