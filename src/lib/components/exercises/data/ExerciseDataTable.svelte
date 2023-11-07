<script lang="ts">
	import { t } from 'svelte-i18n';
	import * as Table from '$lib/components/ui/table';
	import ExerciseDataIconCheck from './ExerciseDataIconCheck.svelte';
	import { getUserData, setExercise } from '$lib/utils/context';
	import { createExerciseStore } from '$lib/stores/currentWorkout/store';
	import ExerciseDataAddSetButton from './ExerciseDataAddSetButton.svelte';
	import ExerciseDataTableRow from './ExerciseDataTableRow.svelte';

	export let exerciseId: string;
	export let sets: number | undefined;
	export let volume: number | undefined;

	const userData = getUserData();
	const exercise = createExerciseStore($userData.uid, exerciseId);
	$: setExercise(exerciseId, exercise);
	$: ({ exerciseSets } = exercise);

	$: sets = $exerciseSets?.filter((set) => set.done).length;
	$: volume = $exerciseSets?.reduce(
		(acc, set) => acc + (set.done ? ((set.weight || 0) * (set.reps || 0), 0) : 0),
		0
	);
</script>

<Table.Root class="text-center table-fixed">
	<Table.Header>
		<Table.Row>
			<Table.Head class="uppercase text-center px-0">
				{$t('pages.workout.log.sets')}
			</Table.Head>
			<Table.Head class="uppercase text-center px-0">
				{$userData.units.weight}
			</Table.Head>
			<Table.Head class="uppercase text-center px-0">
				{$t('pages.workout.log.reps')}
			</Table.Head>

			<Table.Head class="uppercase text-center px-0">
				<ExerciseDataIconCheck />
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each $exerciseSets || [] as set, index (set.id)}
			{@const setId = set.id}
			<ExerciseDataTableRow {exerciseId} {setId} {index} />
		{/each}
	</Table.Body>
</Table.Root>
<ExerciseDataAddSetButton {exerciseId} />
