<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { t } from 'svelte-i18n';

	export let data: LayoutData;

	$: ({ fRel } = data);
</script>

<SettingsHeader {fRel} />

<section>
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
