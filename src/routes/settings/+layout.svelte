<script lang="ts">
	import type { LayoutData } from './$types';

	import SettingsList from '$lib/containers/settings/SettingsList.svelte';
	import SettingsListHeader from '$lib/containers/settings/SettingsListHeader.svelte';
	import { page } from '$app/stores';

	export let data: LayoutData;

	$: isRoot = $page.url.pathname === '/settings';
	$: ({ fRel } = data);
</script>

<section class="container">
	<div class="list" class:root={!isRoot}>
		<SettingsListHeader {fRel} />
		<SettingsList />
	</div>
	<div class="wrapper content" class:root={!isRoot}>
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		--ct-max-width: 1280px !important;
		background: hsl(var(--base-100));
		padding: 0;

		.list {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;

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

		.content {
			view-transition-name: settings-list-content;
		}
	}
</style>
