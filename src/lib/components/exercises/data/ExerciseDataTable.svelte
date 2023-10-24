<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { t } from 'svelte-i18n';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import ExerciseDataTableActions from './ExerciseDataTableActions.svelte';
	import ExerciseDataTableSetActions from './ExerciseDataTableSetActions.svelte';
	import ExerciseDataIconCheck from './ExerciseDataIconCheck.svelte';
	import ExerciseDataAddSetButton from './ExerciseDataAddSetButton.svelte';
	import { getUserData, setExercise } from '$lib/utils/context';
	import { createExerciseStore } from '$lib/stores/currentWorkout/store';
	import ExerciseDataCheckbox from './ExerciseDataCheckbox.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import ExerciseDataWeight from './ExerciseDataWeight.svelte';
	import ExerciseDataReps from './ExerciseDataReps.svelte';

	export let exerciseId: string;

	const userData = getUserData();
	const exercise = createExerciseStore($userData.uid, exerciseId);
	$: setExercise(exerciseId, exercise);
	$: ({ exerciseDoc, exerciseSets } = exercise);

	let table = createTable(readable($exerciseSets || []));
	$: table = createTable(readable($exerciseSets || []));
	const columns = table?.createColumns([
		table?.column({
			accessor: 'rpe',
			header: $t('pages.workout.log.rpe'),
			cell: (cell) => `${cell.value || 0}`
		})
	]);

	$: ({ headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between items-center">
		<h2 class="text-xl pl-2">{capitalizeFirstLetter($exerciseDoc?.exerciseName || '...')}</h2>
		<ExerciseDataTableActions {exerciseId} />
	</div>
	<Table.Root {...$tableAttrs} class="text-center table-fixed">
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
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
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs} class="uppercase text-center px-0">
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}

						<Table.Head class="uppercase text-center px-0">
							<ExerciseDataIconCheck />
						</Table.Head>
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row, index (row.id)}
				{@const setId = $exerciseSets[index]?.id || ''}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
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
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs} class="p-2">
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}

						<Table.Cell class="p-2 !pr-2">
							{#key $exerciseSets.length}
								<ExerciseDataCheckbox {exerciseId} {setId} />
							{/key}
						</Table.Cell>
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
	<ExerciseDataAddSetButton {exerciseId} />
</div>
