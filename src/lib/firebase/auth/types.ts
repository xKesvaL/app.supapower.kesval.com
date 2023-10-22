import type { User } from 'firebase/auth';
import type { Readable } from 'svelte/store';

export interface AuthResponse {
	success: boolean;
	error?: AuthError;
}

export type AuthError = AuthErrorLogin | AuthErrorRegister | AuthErrorPopup;

export type AuthType = 'login' | 'register' | 'reauth' | 'popup';

export interface AuthErrorBase {
	type: AuthType;
}

export interface AuthErrorLogin extends AuthErrorBase {
	type: 'login';
	code: AuthErrorCodeLogin;
}

export interface AuthErrorRegister extends AuthErrorBase {
	type: 'register';
	code: AuthErrorCodeRegister;
}

export interface AuthErrorPopup extends AuthErrorBase {
	type: 'popup';
	code: AuthErrorCodePopup;
}

export type AuthErrorCodeLogin =
	| 'auth/invalid-email'
	| 'auth/user-disabled'
	| 'auth/user-not-found'
	| 'auth/wrong-password';

export type AuthErrorCodeRegister =
	| 'auth/email-already-in-use'
	| 'auth/invalid-email'
	| 'auth/operation-not-allowed'
	| 'auth/weak-password';

export type AuthErrorCodeReauth =
	| 'auth/user-mismatch'
	| 'auth/user-not-found'
	| 'auth/invalid-credential'
	| 'auth/invalid-email'
	| 'auth/wrong-password'
	| 'auth/invalid-verification-code'
	| 'auth/invalid-verification-id';

export type AuthErrorCodePopup =
	| 'auth/account-exists-with-different-credential'
	| 'auth/auth-domain-config-required'
	| 'auth/cancelled-popup-request'
	| 'auth/operation-not-allowed'
	| 'auth/operation-not-supported-in-this-environment'
	| 'auth/popup-blocked'
	| 'auth/popup-closed-by-user'
	| 'auth/unauthorized-domain';

export type UserStore = Readable<User | undefined | null>;

export type UserStoreContext = Readable<User>;
