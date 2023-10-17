<script lang="ts">
	import ExerciseDataTable from '$lib/components/exercises/data/ExerciseDataTable.svelte';
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import { updateSetsOfCurrentWorkoutExercise } from '$lib/firebase/workout/actions';
	import type { WorkoutStoreContext } from '$lib/firebase/workout/types';
	import { getContext } from 'svelte';

	const currentWorkout: WorkoutStoreContext = getContext('currentWorkout');
	const userData: UserDataStoreContext = getContext('userData');

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
	{#each $currentWorkout.exercises as exercise}
		<ExerciseDataTable exerciseSets={exercise.sets} />
	{/each}
</section>

<style lang="scss">
	section.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
