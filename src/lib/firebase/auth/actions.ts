import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config';

import type { AuthResponse } from './types';

const authLoginWithPassword = async (email: string, password: string): Promise<AuthResponse> => {
	let res: AuthResponse = {
		success: false
	};

	await signInWithEmailAndPassword(auth, email, password)
		.then(() => {
			res = {
				success: true
			};
		})
		.catch((e) => {
			res = {
				success: false,
				error: {
					code: e.code,
					type: 'login'
				}
			};
		});

	return res;
};

const authRegisterWithPassword = async (email: string, password: string): Promise<AuthResponse> => {
	let res: AuthResponse = {
		success: false
	};

	await createUserWithEmailAndPassword(auth, email, password)
		.then(() => {
			res = {
				success: true
			};
		})
		.catch((e) => {
			res = {
				success: false,
				error: {
					code: e.code,
					type: 'register'
				}
			};
		});

	return res;
};

export { authLoginWithPassword, authRegisterWithPassword };
