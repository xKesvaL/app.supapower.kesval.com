<script lang="ts">
	import SettingsList from '$lib/containers/settings/SettingsList.svelte';
	import SettingsListHeader from '$lib/containers/settings/SettingsListHeader.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { url, fRel } = data;
</script>

<section>
	<div class="list" class:root={url.pathname !== '/settings'}>
		<SettingsListHeader {fRel} />
		<SettingsList />
	</div>
	<div class="wrapper" class:root={url.pathname !== '/settings'}>
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
