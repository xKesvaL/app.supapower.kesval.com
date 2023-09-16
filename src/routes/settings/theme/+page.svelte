<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { t } from 'svelte-i18n';
	import { theme } from '$lib/stores/theme';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const onChangeTheme = (e: Event) => {
		theme.set((e.target as HTMLInputElement).value as 'light' | 'dark');
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
	<a
		class="special-link"
		href="https://github.com/xKesvaL/app.supapower.kesval.com/issues"
		target="_blank"
		rel="noopener noreferrer">{$t('std.reportIssue')}</a
	>
</section>

<style lang="scss">
	section {
		padding: 1rem;

		form {
			margin-bottom: 1rem;

			label {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}

		a.special-link {
			color: var(--primary-800);
			transition: 0.3s ease;
			position: relative;
			margin-top: 0.5rem;
			display: inline-block;

			&::after {
				content: '';
				position: absolute;
				bottom: -0.125rem;
				left: 0;
				right: 0;
				height: 1px;
				background: var(--primary-800);
				transition: 0.3s ease;
				transform: scaleX(0);
			}

			&:hover {
				color: var(--primary-700);

				&::after {
					transform: scaleX(1);
				}
			}
		}
	}
</style>
