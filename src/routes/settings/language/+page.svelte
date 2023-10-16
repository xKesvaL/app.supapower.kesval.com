<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { locale, locales, t } from 'svelte-i18n';

	import * as Select from '$lib/components/ui/select';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const changeSelectedLang = (opt: any) => {
		console.log(opt.value);
	};
</script>

<SettingsHeader {fRel} />

<section class="flex flex-col gap-4">
	<h2 class="text-xl">
		{$t('pages.settings.language.label')}
	</h2>
	<Select.Root
		onSelectedChange={changeSelectedLang}
		selected={{ value: locale, label: $t(`lang.${$locale?.split('-')[0]}`) }}
	>
		<Select.Trigger>
			<Select.Value placeholder={$t('pages.settings.language.select')} />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>{$t('pages.settings.language.label')}</Select.Label>
				{#each $locales as loc}
					<Select.Item value={loc} label={$t(`lang.${loc?.split('-')[0]}`)}
						>{$t(`lang.${loc?.split('-')[0]}`)}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input />
	</Select.Root>
</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
