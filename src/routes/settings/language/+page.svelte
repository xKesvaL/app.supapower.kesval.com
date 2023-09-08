<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';

	export let data: LayoutData;

	$: ({ fRel } = data);
</script>

<SettingsHeader {fRel} />

<section>langue ici parametres</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
