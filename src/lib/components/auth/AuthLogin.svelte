<script lang="ts">
	import { t } from 'svelte-i18n';

	import Button from '../base/Button.svelte';

	import { authLoginWithPassword } from '$lib/firebase/auth/actions';
	import { AuthLoginWithPasswordSchema } from '$lib/firebase/auth/schemas';
	import type { AuthError } from '$lib/firebase/auth/types';

	import { formatZodError } from '$lib/utils/functions';
	import type { FormattedZodError } from '$lib/typings/standard';

	import { blur } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import IconEyeOff from '$lib/icons/IconEyeOff.svelte';
	import IconEye from '$lib/icons/IconEye.svelte';
	import { ROUTES } from '$lib/config';

	let fieldErrors: FormattedZodError = {};
	let authError: AuthError | null = null;
	let loading = false;
	let showPassword = false;

	const dispatch = createEventDispatcher();

	const login = async (e: SubmitEvent) => {
		loading = true;
		fieldErrors = {};
		authError = null;
		const formData = new FormData(e.target as HTMLFormElement);

		const userData = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		const schemaRes = AuthLoginWithPasswordSchema.safeParse(userData);

		if (!schemaRes.success) {
			fieldErrors = formatZodError(schemaRes.error);
			loading = false;
			return;
		}

		const authRes = await authLoginWithPassword(schemaRes.data.email, schemaRes.data.password);

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
</script>

<form on:submit|preventDefault={login}>
	<header>
		<h1>{$t('auth.login.label')}</h1>
	</header>
	<section>
		<label>
			<span>{$t('auth.fields.email.label')}</span>
			<input type="email" autocomplete="email" name="email" />
			{#if fieldErrors.email}
				<span class="error" transition:blur={{ duration: 300 }}
					>{$t(fieldErrors.email.message)}</span
				>
			{/if}
		</label>
		<label>
			<div class="flex">
				<span>
					{$t('auth.fields.password.label')}
				</span>
				<span class="text-right"
					><a href={ROUTES.forgotpassword}>{$t('auth.login.forgotPassword')}</a></span
				>
			</div>
			<div class="input-w-icon">
				<input
					type={showPassword ? 'text' : 'password'}
					autocomplete="current-password"
					name="password"
				/>
				<button type="button" class="icon" on:click={() => toggleShowPassword()}>
					{#if showPassword}
						<IconEyeOff />
					{:else}
						<IconEye />
					{/if}
				</button>
			</div>
			{#if fieldErrors.password}
				<span class="error" transition:blur={{ duration: 300 }}
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
				{$t('auth.login.action')}
			{/if}
		</Button>
		<span
			on:click={() => switchTo()}
			on:keydown|preventDefault={(e) => e.key === 'Enter' && switchTo()}
			role="button"
			tabindex="0"
		>
			{$t(`auth.switchTo.login`)}
		</span>
		{#if authError}
			<span class="error" transition:blur={{ duration: 300 }}
				>{$t(`auth.errors.login.${authError.code}`)}</span
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
				.flex {
					align-items: center;
					justify-content: space-between;

					span {
						margin-top: 0;
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
				color: hsl(var(--base-700));
			}
		}
	}
</style>
