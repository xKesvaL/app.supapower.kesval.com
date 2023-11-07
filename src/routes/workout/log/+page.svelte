<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { getContext } from 'svelte';

	import WorkoutLogHeader from '$lib/containers/workout/log/WorkoutLogHeader.svelte';
	import WorkoutLogStats from '$lib/containers/workout/log/WorkoutLogStats.svelte';

	import WorkoutLogFooter from '$lib/containers/workout/log/WorkoutLogFooter.svelte';
	import WorkoutLogExercises from '$lib/containers/workout/log/WorkoutLogExercises.svelte';
	import type { CurrentWorkoutStore } from '$lib/stores/currentWorkout/types';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const { workoutDoc } = getContext<CurrentWorkoutStore>('currentWorkout');

	let volume = 0;
	let sets = 0;
</script>

<WorkoutLogHeader {fRel} />
<WorkoutLogStats {volume} {sets} />
{#if $workoutDoc === undefined}
	<section class="container load">
		<span class="loading" />
	</section>
{:else if $workoutDoc !== null}
	<WorkoutLogExercises bind:totalVolume={volume} bind:totalSets={sets} />
{/if}
<WorkoutLogFooter />

<style lang="scss">
	.container {
		&.load {
			display: flex;
			min-height: 70vh;
			width: 100%;
			align-items: center;
			justify-content: center;

			span {
				width: 4rem;
				height: 4rem;
			}
		}
	}
</style>
