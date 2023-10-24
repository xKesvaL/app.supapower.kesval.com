<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import type { WorkoutExerciseSet } from '$lib/stores/currentWorkout/types';
	import { getExercise } from '$lib/utils/context';

	export let exerciseId: string;
	export let setId: string;

	const { exerciseSets, updateExerciseSet } = getExercise(exerciseId);

	const set: WorkoutExerciseSet = $exerciseSets.find((set) => set.id === setId)!;

	let weight = set.weight;

	const updateChecked = async (w: number) => {
		updateExerciseSet(setId, {
			weight: w
		});
	};

	$: updateChecked(Number(weight));
</script>

<Input bind:value={weight} type="number" class="text-center p-2" />
