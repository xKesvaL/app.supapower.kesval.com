<script lang="ts">
	import WorkoutLogHeader from '$lib/containers/workout/log/WorkoutLogHeader.svelte';
	import type { LayoutData } from '../../$types';
	import WorkoutLogStats from '$lib/containers/workout/log/WorkoutLogStats.svelte';
	import { getContext } from 'svelte';
	import type { WorkoutStore } from '$lib/data/workoutsList';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	$: if ($currentWorkout) {
		console.log($currentWorkout);
	} else if ($currentWorkout === undefined) {
		console.log('Loading workout');
	} else {
		console.log('No workout, create one');
	}
</script>

<WorkoutLogHeader {fRel} />
<WorkoutLogStats {currentWorkout} />
<section class="container">ok</section>
