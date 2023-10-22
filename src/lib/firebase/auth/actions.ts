import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { auth } from '../config';

import type { AuthResponse } from './types';

const googleAuthProvider = new GoogleAuthProvider();

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

const authWithGoogle = async (): Promise<AuthResponse> => {
	let res: AuthResponse = {
		success: false
	};

	await signInWithPopup(auth, googleAuthProvider)
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
					type: 'popup'
				}
			};
		});

	return res;
};

export { authLoginWithPassword, authRegisterWithPassword, authWithGoogle };
