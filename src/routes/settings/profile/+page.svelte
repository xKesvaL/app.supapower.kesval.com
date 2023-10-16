<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Textarea } from '$lib/components/ui/textarea';
	import { t } from 'svelte-i18n';
	import { getContext } from 'svelte';
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import { updateUserData } from '$lib/firebase/user/actions';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const userData = getContext<UserDataStoreContext>('userData');

	const onPublicChange = (val: boolean | undefined) => {
		isPublic = val || false;
	};

	let saveButtonEnabled = false;
	let biography = $userData.profile.biography;
	let isPublic = $userData.profile.public;
	let loading = false;

	$: saveButtonEnabled =
		biography !== $userData.profile.biography || isPublic !== $userData.profile.public;

	const onSave = async () => {
		loading = true;
		await updateUserData($userData.uid, {
			profile: {
				biography,
				public: isPublic
			}
		});
		loading = false;
	};
</script>

<SettingsHeader {loading} {fRel} {saveButtonEnabled} on:save={onSave} />

<section class="flex flex-col gap-4">
	<Label class="flex flex-col gap-2">
		<h2 class="text-xl">{$t('pages.settings.profile.bio')}</h2>
		<Textarea
			placeholder={$t('pages.settings.profile.bioPlaceholder')}
			class="placeholder:text-muted-foreground/75"
			bind:value={biography}
		/>
	</Label>
	<div class="flex flex-col gap-2">
		<h2 class="text-xl">{$t('pages.settings.profile.access')}</h2>
		<Label class="flex items-center justify-between gap-2">
			<span>{$t('pages.settings.profile.toggle')}</span>
			<Switch onCheckedChange={onPublicChange} />
		</Label>
		<p class="text-muted-foreground text-sm">
			{$t('pages.settings.profile.toggle_desc')}
		</p>
		<p class="text-muted-foreground text-sm">
			{$t('pages.settings.profile.toggle_desc_bis')}
		</p>
	</div>
</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
