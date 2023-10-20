<script lang="ts">
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import type { WorkoutExerciseSet } from '$lib/firebase/workout/types';
	import { getContext } from 'svelte';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { t } from 'svelte-i18n';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import ExerciseDataTableActions from './ExerciseDataTableActions.svelte';
	import ExerciseDataTableExerciseActions from './ExerciseDataTableExerciseActions.svelte';
	import ExerciseDataIconCheck from './ExerciseDataIconCheck.svelte';

	export let exerciseSets: WorkoutExerciseSet[] = [];

	const userData = getContext<UserDataStoreContext>('userData');

	const table = createTable(readable(exerciseSets));

	const columns = table.createColumns([
		table.column({
			accessor: 'weight',
			header: $userData.units.weight,
			cell: (cell) => `${cell.value || 0}`
		}),
		table.column({
			accessor: 'reps',
			header: $t('pages.workout.log.reps'),
			cell: (cell) => `${cell.value || 0}`
		}),
		table.column({
			accessor: 'rpe',
			header: $t('pages.workout.log.rpe'),
			cell: (cell) => `${cell.value || 0}`
		}),
		table.column({
			accessor: 'done',
			header: () => {
				return createRender(ExerciseDataIconCheck);
			}
		}),
		table.column({
			accessor: 'type',
			header: () => {
				return createRender(ExerciseDataTableActions);
			},
			cell: () => {
				return createRender(ExerciseDataTableExerciseActions);
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<Table.Root {...$tableAttrs} class="text-center">
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
					<Table.Cell class="p-2">{i + 1}</Table.Cell>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<Table.Cell {...attrs} class="p-2">
								<Render of={cell.render()} />
							</Table.Cell>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>
