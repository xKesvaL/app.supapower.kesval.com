<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';

	export let data: LayoutData;

	$: ({ fRel } = data);
</script>

<SettingsHeader {fRel} />

<section>
	<p>
		Sorry, further customization will be added later on for profiles. Right now, we're focusing on
		making the app work great.
	</p>
</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
