<script lang="ts">
	import { t } from 'svelte-i18n';

	import Button from '../base/Button.svelte';

	import { authRegisterWithPassword } from '$lib/firebase/auth/actions';
	import { AuthRegisterWithPasswordSchema } from '$lib/firebase/auth/schemas';
	import type { AuthError } from '$lib/firebase/auth/types';

	import { formatZodError } from '$lib/utils/functions';
	import type { FormattedZodError } from '$lib/typings/standard';

	import { blur } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import IconEyeOff from '$lib/icons/IconEyeOff.svelte';
	import IconEye from '$lib/icons/IconEye.svelte';
	import PasswordStrength from './PasswordStrength.svelte';
	import type { FormEventHandler } from 'svelte/elements';

	let fieldErrors: FormattedZodError = {};
	let authError: AuthError | null = null;
	let loading = false;
	let showPassword = false;
	let password = '';

	const dispatch = createEventDispatcher();

	const login = async (e: SubmitEvent) => {
		loading = true;
		fieldErrors = {};
		authError = null;
		const formData = new FormData(e.target as HTMLFormElement);

		const userData = {
			email: formData.get('email'),
			password
		};

		const schemaRes = AuthRegisterWithPasswordSchema.safeParse(userData);

		if (!schemaRes.success) {
			fieldErrors = formatZodError(schemaRes.error);
			loading = false;
			return;
		}

		const authRes = await authRegisterWithPassword(schemaRes.data.email, schemaRes.data.password);

		if (authRes.error) {
			authError = authRes.error;
		}

		loading = false;
	};

	const switchTo = () => {
		dispatch('switchTo', 'register');
	};

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};

	const setPassword: FormEventHandler<HTMLInputElement> = (e) => {
		password = (e.currentTarget as HTMLInputElement).value;
	};
</script>

<form on:submit|preventDefault={login}>
	<header>
		<h1>{$t('auth.register.label')}</h1>
	</header>
	<section>
		<label>
			<span>{$t('auth.fields.email.label')}</span>
			<input type="email" autocomplete="email" name="email" />
			{#if fieldErrors.email}
				<span class="error" transition:blur={{ duration: 200 }}
					>{$t(fieldErrors.email.message)}</span
				>
			{/if}
		</label>
		<label>
			<span>{$t('auth.fields.password.label')}</span>
			<div class="input-w-icon">
				<input
					type={showPassword ? 'text' : 'password'}
					autocomplete="new-password"
					name="password"
					on:input={setPassword}
				/>
				<button type="button" class="icon" on:click={() => toggleShowPassword()}>
					{#if showPassword}
						<IconEyeOff />
					{:else}
						<IconEye />
					{/if}
				</button>
			</div>
			<PasswordStrength {password} />
			{#if fieldErrors.password}
				<span class="error" transition:blur={{ duration: 200 }}
					>{$t(fieldErrors.password.message)}</span
				>
			{/if}
		</label>
	</section>
	<footer>
		<Button customButtonStyles="flex: 1;" type="submit">
			{#if loading}
				<span class="loading" />
			{:else}
				{$t('auth.register.action')}
			{/if}
		</Button>
		<span
			on:click={() => switchTo()}
			on:keydown|preventDefault={(e) => e.key === 'Enter' && switchTo()}
			role="button"
			tabindex="0"
		>
			{$t(`auth.switchTo.register`)}
		</span>
		{#if authError}
			<span class="error" transition:blur={{ duration: 200 }}
				>{$t(`auth.errors.register.${authError.code}`)}</span
			>
		{/if}
	</footer>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 1rem;

		header {
			h1 {
				font-size: var(--fs-800);
				margin-block: 0;
			}
		}

		section {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			label {
				.input-w-icon {
					position: relative;
					display: flex;
					align-items: center;

					.icon {
						position: absolute;
						width: 24px;
						height: 24px;
						padding: 0;
						background: none;
						right: 0.75rem;
					}
				}
			}
		}

		footer {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			width: 100%;

			span {
				text-align: center;
				font-size: var(--fs-200);
				margin: 0 auto;
			}

			span:not(.error) {
				color: var(--base-700);
			}
		}
	}
</style>
