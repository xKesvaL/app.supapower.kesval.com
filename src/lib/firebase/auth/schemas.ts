import { z } from 'zod';

export const AuthLoginWithPasswordSchema = z.object({
	email: z
		.string({
			required_error: 'auth.errors.email.required',
			invalid_type_error: 'auth.errors.standard.invalid'
		})
		.email({
			message: 'auth.errors.email.invalid'
		}),
	password: z
		.string({
			required_error: 'auth.errors.password.required',
			invalid_type_error: 'auth.errors.standard.invalid'
		})
		.min(8, {
			message: 'auth.errors.password.min'
		})
		.max(32, {
			message: 'auth.errors.password.max'
		})
});

export const AuthRegisterWithPasswordSchema = AuthLoginWithPasswordSchema.extend({});
