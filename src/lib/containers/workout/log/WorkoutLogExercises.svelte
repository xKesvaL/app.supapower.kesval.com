<script lang="ts">
	import ExerciseDataTable from '$lib/components/exercises/data/ExerciseDataTable.svelte';
	import ExerciseDataTableActions from '$lib/components/exercises/data/ExerciseDataTableActions.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import autoAnimate from '@formkit/auto-animate';
	import { getContext } from 'svelte';

	const { exercisesCol }: CurrentWorkoutStoreContext = getContext('currentWorkout');
</script>

<section class="container" use:autoAnimate>
	{#if $exercisesCol === undefined}
		<span class="loading"> </span>
	{:else if $exercisesCol}
		{#each $exercisesCol as exercise (exercise.id)}
			<div class="flex flex-col gap-2">
				<div class="flex justify-between items-center">
					<h2 class="text-xl pl-2">{capitalizeFirstLetter(exercise.exerciseName)}</h2>
					<ExerciseDataTableActions exerciseId={exercise.id} />
				</div>
				<ExerciseDataTable exerciseId={exercise.id} />
			</div>
		{/each}
	{/if}
</section>

<style lang="scss">
	section.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
