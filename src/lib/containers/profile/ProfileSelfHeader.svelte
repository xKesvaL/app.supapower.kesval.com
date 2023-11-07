<script lang="ts">
	import { PAGES } from '$lib/ROUTES';
	import { Button } from '$lib/components/ui/button';
	import type { UserData } from '$lib/firebase/user/types';
	import IconSettings from '$lib/icons/IconSettings.svelte';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import type { Readable } from 'svelte/store';

	const userData: Readable<UserData> = getContext('userData');
</script>

<header class="page-header">
	<div class="start"></div>
	<div class="center">
		{$userData.username}
	</div>
	<div class="end">
		<Button
			size="icon"
			class="p-1 bg-transparent hover:bg-transparent text-foreground"
			href="{PAGES.settings()}?frel={PAGES.profile()}"
		>
			<IconSettings />
			<span class="visually-hidden">{$t('pages.settings.label')}</span>
		</Button>
	</div>
</header>

<style lang="scss">
	header {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		padding: 0.75rem 1rem;
		gap: 0.5rem;

		div {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			&.start {
				justify-content: flex-start;
			}

			&.center {
				color: var(--base-700);
			}

			&.end {
				justify-content: flex-end;
			}
		}
	}
</style>
