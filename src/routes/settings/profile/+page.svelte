<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';

	export let data: LayoutData;

	const { fRel } = data;
</script>

<SettingsHeader {fRel} />

profil stp fonctionne
