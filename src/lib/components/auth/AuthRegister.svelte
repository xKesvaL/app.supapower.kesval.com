<script lang="ts">
	import { t } from 'svelte-i18n';

	import { authRegisterWithPassword, authWithGoogle } from '$lib/firebase/auth/actions';
	import { AuthRegisterWithPasswordSchema } from '$lib/firebase/auth/schemas';
	import type { AuthError } from '$lib/firebase/auth/types';

	import { formatZodError } from '$lib/utils/functions';
	import type { FormattedZodError } from '$lib/typings/standard';

	import { blur } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import IconEyeOff from '$lib/icons/IconEyeOff.svelte';
	import IconEye from '$lib/icons/IconEye.svelte';
	import PasswordStrength from './PasswordStrength.svelte';
	import { Label } from '../ui/label';
	import { Input } from '../ui/input';
	import { Button } from '../ui/button';
	import IconGoogle from '$lib/icons/IconGoogle.svelte';

	let fieldErrors: FormattedZodError = {};
	let authError: AuthError | null = null;
	let loading = false;
	let googleLoading = false;
	let showPassword = false;
	let password = '';

	const dispatch = createEventDispatcher();

	const register = async (e: SubmitEvent) => {
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

	const loginWithGoogle = async (e: Event) => {
		e.preventDefault();
		googleLoading = true;
		fieldErrors = {};
		authError = null;

		const authRes = await authWithGoogle();

		if (authRes.error) {
			authError = authRes.error;
		}

		googleLoading = false;
	};

	const switchTo = () => {
		dispatch('switchTo', 'register');
	};

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};
</script>

<form on:submit|preventDefault={register} class="flex flex-col gap-8 items-center w-full">
	<header>
		<h1 class="text-5xl">{$t('auth.register.label')}</h1>
	</header>
	<section class="w-full flex flex-col gap-4">
		<Label class="flex flex-col gap-1">
			<span>{$t('auth.fields.email.label')}</span>
			<Input type="email" autocomplete="email" name="email" />
			{#if fieldErrors.email}
				<span class="error" transition:blur={{ duration: 300 }}
					>{$t(fieldErrors.email.message)}</span
				>
			{/if}
		</Label>
		<Label class="flex flex-col gap-1">
			<span> {$t('auth.fields.password.label')}</span>
			<div class="relative flex items-center">
				<Input
					type={showPassword ? 'text' : 'password'}
					autocomplete="new-password"
					name="password"
					bind:value={password}
				/>
				<Button
					type="button"
					class="icon absolute right-0 p-2 bg-transparent hover:bg-transparent text-foreground"
					variant="default"
					size="icon"
					on:click={() => toggleShowPassword()}
				>
					{#if showPassword}
						<IconEyeOff />
					{:else}
						<IconEye />
					{/if}
				</Button>
			</div>
			<PasswordStrength {password} />
			{#if fieldErrors.password}
				<span class="error" transition:blur={{ duration: 300 }}
					>{$t(fieldErrors.password.message)}</span
				>
			{/if}
		</Label>
	</section>
	<footer class="flex flex-col gap-2 w-full">
		<Button type="submit">
			{#if loading}
				<span class="loading" />
			{:else}
				{$t('auth.register.action')}
			{/if}
		</Button>
		<Button on:click={loginWithGoogle} variant="secondary" type="button" class="gap-2">
			{#if googleLoading}
				<span class="loading" />
			{:else}
				<div class="w-5 h-5">
					<IconGoogle />
				</div>
				{$t('auth.register.actionGoogle')}
			{/if}
		</Button>
		<Button
			on:click={() => switchTo()}
			role="button"
			class="text-muted-foreground text-sm mx-auto p-0 h-auto"
			variant="link"
		>
			{$t(`auth.switchTo.register`)}
		</Button>
		{#if authError}
			<span class="error text-center" transition:blur={{ duration: 300 }}
				>{$t(`auth.errors.register.${authError.code}`)}</span
			>
		{/if}
	</footer>
</form>
