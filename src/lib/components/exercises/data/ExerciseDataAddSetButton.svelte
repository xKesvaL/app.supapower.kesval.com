<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	export let exerciseId: string;

	const { exercisesCol, ...currentWorkout } = getContext<CurrentWorkoutStoreContext>('currentWorkout');

	const addSet = async () => {
		await currentWorkout.addExerciseSet(exerciseId, $exercisesCol?.filter((e) => e.id === exerciseId)[0]?.sets || []);
	};
</script>

<Button class="bg-muted hover:bg-muted/90 text-muted-foreground" size="sm" on:click={addSet}>
	{$t('pages.workout.log.addSet')}
</Button>
