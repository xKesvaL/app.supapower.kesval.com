<script lang="ts">
	import { t } from 'svelte-i18n';
	import * as Table from '$lib/components/ui/table';
	import ExerciseDataTableSetActions from './ExerciseDataTableSetActions.svelte';
	import ExerciseDataIconCheck from './ExerciseDataIconCheck.svelte';
	import { getUserData, setExercise } from '$lib/utils/context';
	import { createExerciseStore } from '$lib/stores/currentWorkout/store';
	import ExerciseDataCheckbox from './ExerciseDataCheckbox.svelte';
	import ExerciseDataWeight from './ExerciseDataWeight.svelte';
	import ExerciseDataReps from './ExerciseDataReps.svelte';

	export let exerciseId: string;

	const userData = getUserData();
	const exercise = createExerciseStore($userData.uid, exerciseId);
	$: setExercise(exerciseId, exercise);
	$: ({ exerciseSets } = exercise);
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
			<Table.Row>
				<Table.Cell class="p-2">
					<ExerciseDataTableSetActions {exerciseId} {setId} {index} />
				</Table.Cell>
				<Table.Cell class="p-2">
					{#key $exerciseSets.length}
						<ExerciseDataWeight {exerciseId} {setId} />
					{/key}
				</Table.Cell>
				<Table.Cell class="p-2">
					{#key $exerciseSets.length}
						<ExerciseDataReps {exerciseId} {setId} />
					{/key}
				</Table.Cell>

				<Table.Cell class="p-2 !pr-2">
					{#key $exerciseSets.length}
						<ExerciseDataCheckbox {exerciseId} {setId} />
					{/key}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
