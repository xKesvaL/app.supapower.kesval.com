<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { t } from 'svelte-i18n';
	import { theme } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const onChangeTheme = (e: Event) => {
		theme.set((e.target as HTMLInputElement).value as string);
	};
</script>

<SettingsHeader {fRel} saveButton={false} />

<section>
	<form>
		<label>
			<input
				type="radio"
				name="theme"
				value="light"
				checked={$theme === 'light'}
				on:change={onChangeTheme}
			/>
			{$t('pages.settings.list.theme.light')}
		</label>
		<label>
			<input
				type="radio"
				name="theme"
				value="auto"
				checked={$theme === 'auto'}
				on:change={onChangeTheme}
			/>
			{$t('pages.settings.list.theme.auto')}
		</label>
		<label>
			<input
				type="radio"
				name="theme"
				value="dark"
				checked={$theme === 'dark'}
				on:change={onChangeTheme}
			/>
			{$t('pages.settings.list.theme.dark')}
		</label>
	</form>
	<p>
		{$t('pages.settings.list.theme.prevention')}
	</p>
	<Button
		class="h-0 p-0 text-muted-foreground text-base"
		href="https://github.com/xKesvaL/app.supapower.kesval.com/issues"
		target="_blank"
		variant="link"
		rel="noopener noreferrer">{$t('std.reportIssue')}</Button
	>
</section>

<style lang="scss">
	section {
		padding: 1rem;

		form {
			margin-bottom: 1rem;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			label {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				input {
					width: 1.25rem;
					height: 1.25rem;
				}
			}
		}
	}
</style>
