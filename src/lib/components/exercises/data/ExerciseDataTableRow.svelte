<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { WorkoutExerciseSet } from '$lib/stores/currentWorkout/types';
	import { getExercise } from '$lib/utils/context';
	import ExerciseDataCheckbox from './ExerciseDataCheckbox.svelte';
	import ExerciseDataReps from './ExerciseDataReps.svelte';
	import ExerciseDataTableSetActions from './ExerciseDataTableSetActions.svelte';
	import ExerciseDataWeight from './ExerciseDataWeight.svelte';

	export let exerciseId: string;
	export let setId: string;
	export let index: number;

	const { exerciseSets, updateExerciseSet } = getExercise(exerciseId);

	const set = $exerciseSets.find((set) => set.id === setId)!;
	let { weight, reps, done } = set;
	let timer: NodeJS.Timeout;
	const TIMEOUT = 15000;

	const update = async (data: Partial<WorkoutExerciseSet>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			updateExerciseSet(setId, data);
		}, TIMEOUT);
	};

	$: update({ weight, reps, done });
</script>

<Table.Row>
	<Table.Cell class="p-2">
		<ExerciseDataTableSetActions {exerciseId} {setId} {index} />
	</Table.Cell>
	<Table.Cell class="p-2">
		<ExerciseDataWeight bind:weight />
	</Table.Cell>
	<Table.Cell class="p-2">
		<ExerciseDataReps bind:reps />
	</Table.Cell>

	<Table.Cell class="p-2 !pr-2">
		<ExerciseDataCheckbox bind:done />
	</Table.Cell>
</Table.Row>
