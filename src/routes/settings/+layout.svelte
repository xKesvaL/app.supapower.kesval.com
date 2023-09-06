<script lang="ts">
	import type { LayoutData } from './$types';

	import SettingsList from '$lib/containers/settings/SettingsList.svelte';
	import SettingsListHeader from '$lib/containers/settings/SettingsListHeader.svelte';
	import { page } from '$app/stores';

	export let data: LayoutData;

	$: isRoot = $page.url.pathname === '/settings';

	const { fRel } = data;
</script>

<section>
	<div class="list" class:root={!isRoot}>
		<SettingsListHeader {fRel} />
		<SettingsList />
	</div>
	<div class="wrapper" class:root={!isRoot}>
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;

		.list {
			display: flex;
			flex-direction: column;
			flex: 1;

			&.root {
				display: none;

				@include mq(lg) {
					display: flex;
				}
			}
		}

		.wrapper {
			display: none;

			&.root {
				display: block;
			}
		}
	}
</style>
