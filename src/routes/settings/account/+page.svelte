<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { getContext } from 'svelte';
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import type { UserStoreContext } from '$lib/firebase/auth/types';
	import { t } from 'svelte-i18n';
	import { sendEmailVerification, updateProfile } from 'firebase/auth';
	import { Button } from '$lib/components/ui/button';
	import IconCheck from '$lib/icons/IconCheck.svelte';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const user = getContext<UserStoreContext>('user');
	const userData = getContext<UserDataStoreContext>('userData');

	let username = $userData.username;
	let email = $user.email;
	let displayName = $user.displayName;

	$: usernameChanged = username !== $userData.username;
	$: displayNameChanged = displayName !== $user.displayName;
	$: saveButtonEnabled = usernameChanged || displayNameChanged;

	let loading = false;
	let emailLoading = false;
	let emailSent = false;

	const onSave = async () => {
		if (usernameChanged) {
			loading = true;
		}

		if (displayNameChanged) {
			loading = true;
			await updateProfile($user, { displayName });
		}

		loading = false;
	};

	const verifyEmail = async () => {
		emailLoading = true;
		await sendEmailVerification($user);
		emailLoading = false;
		emailSent = true;
	};
</script>

<SettingsHeader {fRel} {saveButtonEnabled} on:save={onSave} {loading} />

<section class="flex flex-col gap-4">
	<Label class="flex flex-col gap-2">
		<h2 class="text-xl">
			{$t('pages.settings.account.username')}
		</h2>
		<Input type="text" name="username" disabled bind:value={username} />
		<span class="text-muted-foreground text-sm">
			{$t('pages.settings.account.usernameSoon')}
		</span>
	</Label>
	<Label class="flex flex-col gap-2">
		<h2 class="text-xl">
			{$t('pages.settings.account.email')}
		</h2>
		<div class="flex gap-2">
			<Input
				type="email"
				name="email"
				bind:value={email}
				placeholder={$t('pages.settings.account.emailPlaceholder')}
				disabled
			/>
			{#if $user.emailVerified}
				<Button disabled size="icon" class="p-2">
					<IconCheck />
				</Button>
			{:else}
				<Button on:click={verifyEmail}>
					{#if emailSent}
						{$t('pages.settings.account.emailSent')}
					{:else if emailLoading}
						<span class="loading"></span>
					{:else}
						{$t('pages.settings.account.emailVerify')}
					{/if}
				</Button>
			{/if}
		</div>
	</Label>
	<Label class="flex flex-col gap-2">
		<h2 class="text-xl">{$t('pages.settings.account.displayName')}</h2>
		<Input
			type="text"
			name="displayName"
			bind:value={displayName}
			placeholder={$t('pages.settings.account.displayNamePlaceholder')}
		/>
		<span class="text-muted-foreground text-sm">
			{$t('pages.settings.account.displayNameExplanation')}
		</span>
	</Label>
</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
