<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import type { WorkoutExerciseSet } from '$lib/stores/currentWorkout/types';
	import { getExercise } from '$lib/utils/context';

	export let exerciseId: string;
	export let setId: string;

	const { exerciseSets, updateExerciseSet } = getExercise(exerciseId);

	const set: WorkoutExerciseSet = $exerciseSets.find((set) => set.id === setId)!;

	let weight = set.weight;
	let timer: NodeJS.Timeout;
	const TIMEOUT = 5000;

	const update = async (d: number) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			updateExerciseSet(setId, {
				weight: d || 0
			});
		}, TIMEOUT);
	};

	$: {
		weight = parseInt(weight as never as string);
		update(weight);
	}
</script>

<Input bind:value={weight} type="number" class="text-center p-2" />
