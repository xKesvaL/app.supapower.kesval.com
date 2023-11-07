<script lang="ts">
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import type { CurrentWorkoutStore } from '$lib/stores/currentWorkout/types';
	import { PAGES } from '$lib/ROUTES';

	const { workoutDoc }: CurrentWorkoutStore = getContext('currentWorkout');

	const showDiscardModal = async () => {
		currentWorkoutDiscardModalState.set(true);
	};
</script>

<footer class="container">
	<Button
		href={PAGES.workout_log_add_exercise({ frel: PAGES.workout_log() })}
		class="button primary">{$t('pages.workout.log.addExercise')}</Button
	>
	{#if $workoutDoc}
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
