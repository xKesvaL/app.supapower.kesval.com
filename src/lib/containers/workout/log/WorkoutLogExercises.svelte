<script lang="ts">
	import ExerciseDataTable from '$lib/components/exercises/data/ExerciseDataTable.svelte';
	import ExerciseDataTableActions from '$lib/components/exercises/data/ExerciseDataTableActions.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import autoAnimate from '@formkit/auto-animate';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	const { exercisesCol }: CurrentWorkoutStoreContext = getContext('currentWorkout');

	export let totalVolume: number;
	export let totalSets: number;

	const sets: number[] = [];
	const volumes: number[] = [];

	$: if ($exercisesCol) {
			totalSets = sets.reduce((acc, prev) => acc + prev, 0);
			totalVolume = volumes.reduce((acc, prev) => acc + prev, 0);
		}
	
</script>

<section class="container" use:autoAnimate>
	{#if $exercisesCol === undefined}
		<span class="loading"> </span>
	{:else if $exercisesCol}
		{#each $exercisesCol as exercise, i (exercise.id)}
			<div class="flex flex-col gap-2">
				<div class="flex justify-between items-center">
					<h2 class="text-xl pl-2">{$t(`exercises.${exercise.exerciseName}.name`)}</h2>
					<ExerciseDataTableActions exerciseId={exercise.id} />
				</div>
				<ExerciseDataTable exerciseId={exercise.id} bind:sets={sets[i]} bind:volume={volumes[i]} />
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
