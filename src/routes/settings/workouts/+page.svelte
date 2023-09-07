<script lang="ts">
	import type { LayoutData } from '../$types';
	import type { UserDataStore, WorkoutFrequency, WorkoutType } from '$lib/firebase/user/types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { getContext } from 'svelte';

	export let data: LayoutData;

	const { fRel } = data;

	const userData: UserDataStore = getContext('userData');

	const workoutType: WorkoutType = $userData?.workout.type ?? 'powerbuilding';
	const workoutFrequency: WorkoutFrequency = $userData?.workout.frequency ?? 4;

	const handleSave = async () => {};
</script>

<SettingsHeader {fRel} on:save={handleSave} />

<section>entrainement ici parametres</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
