<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { getExercise } from '$lib/utils/context';
	import { t } from 'svelte-i18n';

	export let exerciseId: string;

	const { addExerciseSet, exerciseDoc } = getExercise(exerciseId);

	const addSet = async () => {
		await addExerciseSet($exerciseDoc.sets || []);
	};
</script>

<Button class="bg-muted hover:bg-muted/90 text-muted-foreground" size="sm" on:click={addSet}>
	{$t('pages.workout.log.addSet')}
</Button>
