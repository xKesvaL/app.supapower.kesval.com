<script lang="ts">
	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { ROUTES } from '$lib/config';
	import { fly } from 'svelte/transition';

	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	const showDiscardModal = async () => {
		currentWorkoutDiscardModalState.set(true);
	};
</script>

<footer class="container">
	<a href="{ROUTES.workoutLogAddexercise}?frel={ROUTES.workoutLog}" class="button primary"
		>{$t('pages.workout.log.addExercise')}</a
	>
	{#if $currentWorkout}
		<div class="flex" transition:fly={{ opacity: 0, y: -20, duration: 300 }}>
			<button class="settings"> {$t('pages.settings.label')} </button>
			<button class="discard" on:click={showDiscardModal}>
				{$t('pages.workout.log.discardModal.discard')}
			</button>
		</div>
	{/if}
</footer>

<style lang="scss">
	footer {
		display: grid;
		gap: 0.5rem;
		a.primary {
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
