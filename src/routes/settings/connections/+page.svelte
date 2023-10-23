<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { t } from 'svelte-i18n';
	import Button from '$lib/components/ui/button/button.svelte';
	import IconGoogle from '$lib/icons/IconGoogle.svelte';
	import { getUser } from '$lib/utils/context';
	import IconX from '$lib/icons/IconX.svelte';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const user = getUser();

	$: providers = $user.providerData.map((p) => p.providerId);
	$: googleLinked = providers.includes('google.com');
</script>

<SettingsHeader {fRel} saveButton={false} />

<section class="p-4 flex flex-col gap-4">
	<div class="flex gap-2">
		<Button size="lg" variant="secondary" class="w-full gap-2">
			<div class="w-6 h-6">
				<IconGoogle />
			</div>
			{#if googleLinked}
				{$t('pages.settings.list.connections.googleLinked')}
			{:else}
				{$t('pages.settings.list.connections.googleLink')}
			{/if}
		</Button>
		{#if googleLinked}
			<Button size="icon" class="p-2 h-11 w-11" variant="destructive">
				<span class="sr-only">
					{$t('pages.settings.list.connections.googleUnlink')}
				</span>
				<IconX />
			</Button>
		{/if}
	</div>
</section>
