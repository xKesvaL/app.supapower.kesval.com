export interface AuthResponse {
	success: boolean;
	error?: AuthError;
}

export type AuthError = AuthErrorLogin | AuthErrorRegister;

export type AuthType = 'login' | 'register' | 'reauth';

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
