<script lang="ts">
	import ExerciseDataTable from '$lib/components/exercises/data/ExerciseDataTable.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import { getContext } from 'svelte';

	const { exercisesCol }: CurrentWorkoutStoreContext = getContext('currentWorkout');

	let ids: string[] = [];

	$: ids = $exercisesCol?.map((e) => `${e.id}-${e.sets.length}`) || [];
</script>

<section class="container">
	{#if $exercisesCol === undefined}
		<span class="loading"> </span>
	{:else if $exercisesCol}
		{#each $exercisesCol as exercise, i (ids[i])}
			<ExerciseDataTable {exercise} />
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
