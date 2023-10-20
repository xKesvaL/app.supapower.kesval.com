<script lang="ts">
	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { ROUTES } from '$lib/config';
	import { fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';

	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	const showDiscardModal = async () => {
		currentWorkoutDiscardModalState.set(true);
	};
</script>

<footer class="container">
	<Button href="{ROUTES.workoutLogAddexercise}?frel={ROUTES.workoutLog}" class="button primary"
		>{$t('pages.workout.log.addExercise')}</Button
	>
	{#if $currentWorkout}
		<div class="grid grid-cols-2 gap-2" transition:fly={{ opacity: 0, y: -20, duration: 300 }}>
			<Button class="bg-muted text-destructive hover:bg-muted/90"
				>{$t('pages.settings.label')}</Button
			>
			<Button class="bg-muted text-info hover:bg-muted/90" on:click={showDiscardModal}>
				{$t('pages.workout.log.discardModal.discard')}
			</Button>
		</div>
	{/if}
</footer>

<style lang="scss">
	footer {
		display: grid;
		gap: 0.5rem;
	}
</style>
