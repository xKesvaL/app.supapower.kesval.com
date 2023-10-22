<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import IconX from '$lib/icons/IconX.svelte';
	import type {
		CurrentWorkoutStoreContext,
		WorkoutExercise
	} from '$lib/stores/currentWorkout/types';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	const currentWorkout = getContext<CurrentWorkoutStoreContext>('currentWorkout');

	export let exercise: WorkoutExercise & { id: string };
	export let setIndex: number;

	const onDelete = async () => {
		currentWorkout.removeExerciseSet(exercise.id, exercise.sets, setIndex);
	};
</script>

<Button variant="ghost" size="icon" class="relative w-8 h-8 p-0" on:click={onDelete}>
	<span class="sr-only">
		{$t('pages.workout.log.exercises.table.actions.removeSet')}
	</span>
	<div class="w-6 h-6">
		<IconX />
	</div>
</Button>
