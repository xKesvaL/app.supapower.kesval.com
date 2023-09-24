<script lang="ts">
	import type { UserStoreContext } from '$lib/firebase/auth/types';
	import { createCurrentWorkout } from '$lib/firebase/workout/actions';
	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { getContext } from 'svelte';

	const user: UserStoreContext = getContext('user');
	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	const addExercise = async () => {
		if (!currentWorkout) {
			await createCurrentWorkout($user.uid);
		}
	};
</script>

<footer>
	<button on:click={addExercise}>Add exercise</button>
</footer>
