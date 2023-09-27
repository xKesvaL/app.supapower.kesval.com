<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { getContext } from 'svelte';

	import WorkoutLogHeader from '$lib/containers/workout/log/WorkoutLogHeader.svelte';
	import WorkoutLogStats from '$lib/containers/workout/log/WorkoutLogStats.svelte';

	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import WorkoutLogFooter from '$lib/containers/workout/log/WorkoutLogFooter.svelte';
	import WorkoutLogExercises from '$lib/containers/workout/log/WorkoutLogExercises.svelte';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const currentWorkout: WorkoutStore = getContext('currentWorkout') || null;
</script>

<WorkoutLogHeader {fRel} />
<WorkoutLogStats {currentWorkout} />
{#if $currentWorkout === undefined}
	<section class="container load">
		<span class="loading" />
	</section>
{:else if $currentWorkout !== null}
	<WorkoutLogExercises />
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
