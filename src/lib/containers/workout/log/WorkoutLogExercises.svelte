<script lang="ts">
	import ExerciseDataTable from '$lib/components/exercises/data/ExerciseDataTable.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import { getContext } from 'svelte';

	const { workoutDoc, exercisesCol }: CurrentWorkoutStoreContext = getContext('currentWorkout');

	$: console.log($exercisesCol);

	// const addSet = async (index: number) => {
	// 	const exercises = $currentWorkout.exercises;
	// 	exercises[index]?.sets.push({
	// 		reps: null,
	// 		weight: null,
	// 		rpe: null,
	// 		type: 'working',
	// 		done: false
	// 	});

	// 	updateSetsOfCurrentWorkoutExercise($userData.uid, exercises);
	// };

	// const removeSet = async (index: number, set: number) => {
	// 	const exercises = $currentWorkout.exercises;

	// 	exercises[index]?.sets.splice(set, 1);

	// 	updateSetsOfCurrentWorkoutExercise($userData.uid, exercises);
	// };
</script>

<section class="container">
	{#if $exercisesCol === undefined}
		<span class="loading"> </span>
	{:else if $exercisesCol}
		{#each $exercisesCol as exercise, index}
			<h2>{exercise.exerciseName}</h2>
			<ExerciseDataTable exerciseSets={exercise.sets} {index} />
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
