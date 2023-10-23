<script lang="ts">
	import ExerciseDataTable from '$lib/components/exercises/data/ExerciseDataTable.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import autoAnimate from '@formkit/auto-animate';
	import { getContext } from 'svelte';

	const { exercisesCol }: CurrentWorkoutStoreContext = getContext('currentWorkout');
</script>

<section class="container" use:autoAnimate>
	{#if $exercisesCol === undefined}
		<span class="loading"> </span>
	{:else if $exercisesCol}
		{#each $exercisesCol as exercise (exercise.id)}
			<ExerciseDataTable exerciseId={exercise.id} />
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
