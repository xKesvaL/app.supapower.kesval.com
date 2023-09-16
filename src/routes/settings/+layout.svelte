<script lang="ts">
	import type { LayoutData } from './$types';

	import SettingsList from '$lib/containers/settings/SettingsList.svelte';
	import SettingsListHeader from '$lib/containers/settings/SettingsListHeader.svelte';
	import { page } from '$app/stores';
	import Card from '$lib/components/base/Card.svelte';

	export let data: LayoutData;

	$: isRoot = $page.url.pathname === '/settings';
	$: ({ fRel } = data);
</script>

<section class="container">
	<Card
		customCardStyle="min-width: none; max-width: auto; width: 100%; view-transition-name: settings-list-card;"
		customCardBgStyle="padding: 0; gap: 0;"
		vertical={false}
		color="primary"
		colorOpacity={0.05}
	>
		<div class="list" class:root={!isRoot}>
			<SettingsListHeader {fRel} />
			<SettingsList />
		</div>
		<div class="wrapper content" class:root={!isRoot}>
			<slot />
		</div>
	</Card>
</section>

<style lang="scss">
	section {
		display: flex;
		--ct-max-width: 1280px !important;
		--ct-padding: 0.1rem 0;

		@include mq(lg) {
			--ct-padding: 1rem;
		}

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
