<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
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

	export let exerciseId: string;

	const userData = getUserData();
	const exercise = createExerciseStore($userData.uid, exerciseId);
	$: setExercise(exerciseId, exercise);
	$: ({ exerciseDoc } = exercise);

	let table = createTable(readable($exerciseDoc?.sets || []));
	$: table = createTable(readable($exerciseDoc?.sets || []));
	const columns = table?.createColumns([
		table?.column({
			accessor: 'weight',
			header: $userData.units.weight,
			cell: (cell) => `${cell.value || 0}`
		}),
		table?.column({
			accessor: 'reps',
			header: $t('pages.workout.log.reps'),
			cell: (cell) => `${cell.value || 0}`
		}),
		table?.column({
			accessor: 'rpe',
			header: $t('pages.workout.log.rpe'),
			cell: (cell) => `${cell.value || 0}`
		}),
		table?.column({
			accessor: 'done',
			header: () => {
				return createRender(ExerciseDataIconCheck);
			},
			cell: (cell) => {
				return createRender(ExerciseDataCheckbox, {
					defaultChecked: cell.value,
					exerciseId,
					setIndex: Number(cell.rowColId().split(':')[0])
				});
			}
		})
	]);

	$: ({ headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between items-center">
		<h2 class="text-xl">{capitalizeFirstLetter($exerciseDoc?.exerciseName || '...')}</h2>
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
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs} class="uppercase text-center px-0">
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row, i (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						<Table.Cell class="p-2">
							<ExerciseDataTableSetActions {exerciseId} setIndex={i} />
						</Table.Cell>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs} class="p-2 !pr-2">
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
	<ExerciseDataAddSetButton {exerciseId} />
</div>
