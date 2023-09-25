<script lang="ts">
	import type { UserStoreContext } from '$lib/firebase/auth/types';
	import { createCurrentWorkout } from '$lib/firebase/workout/actions';
	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/config';

	const user: UserStoreContext = getContext('user');
	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	const addExercise = async () => {
		if (!$currentWorkout) {
			await createCurrentWorkout($user.uid);
		}

		await goto(ROUTES.workoutLogAddexercise);
	};

	const showDiscardModal = async () => {
		currentWorkoutDiscardModalState.set(true);
	};
</script>

<footer class="container">
	<button on:click={addExercise} class="primary">Add exercise</button>
	<div class="flex">
		<button class="settings"> Settings </button>
		<button class="discard" on:click={showDiscardModal}>
			{$t('pages.workout.log.discardModal.discard')}
		</button>
	</div>
</footer>

<style lang="scss">
	footer {
		display: grid;
		gap: 0.5rem;
		button.primary {
			width: 100%;
		}

		.flex {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			button {
				flex: 1;
				background: var(--base-200);
				font-weight: 400;

				&.settings {
					color: var(--info-600);
				}

				&.discard {
					color: var(--danger-600);
				}
			}
		}
	}
</style>
