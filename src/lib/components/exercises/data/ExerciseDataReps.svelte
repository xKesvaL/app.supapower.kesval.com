<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import type { WorkoutExerciseSet } from '$lib/stores/currentWorkout/types';
	import { getExercise } from '$lib/utils/context';

	export let exerciseId: string;
	export let setId: string;

	const { exerciseSets, updateExerciseSet } = getExercise(exerciseId);

	const set: WorkoutExerciseSet = $exerciseSets.find((set) => set.id === setId)!;

	let reps = set.reps;
	let timer: NodeJS.Timeout;
	const TIMEOUT = 5000;

	const update = async (d: number) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			updateExerciseSet(setId, {
				reps: d
			});
		}, TIMEOUT);
	};

	$: update(Number(reps));
</script>

<Input bind:value={reps} type="number" class="text-center p-2" />
