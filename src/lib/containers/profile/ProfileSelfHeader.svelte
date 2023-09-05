<script lang="ts">
	import type { UserData } from '$lib/firebase/user/types';
	import IconSettings from '$lib/icons/IconSettings.svelte';
	import type { User } from 'firebase/auth';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import type { Readable } from 'svelte/store';

	export let returnPath: string = '/';

	const user: Readable<User> = getContext('user');
	const userData: Readable<UserData> = getContext('userData');
</script>

<header>
	<div class="start">
		<a href="/profile">
			{$t('pages.profile.header.self.edit')}
		</a>
	</div>
	<div class="center">
		{$userData.username}
	</div>
	<div class="end">
		<a class="icon" href="/profile">
			<IconSettings />
			<span class="visually-hidden">{$t('pages.profile.header.self.settings')}</span>
		</a>
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

		.icon {
			height: 28px;
			width: 28px;
		}
	}
</style>
