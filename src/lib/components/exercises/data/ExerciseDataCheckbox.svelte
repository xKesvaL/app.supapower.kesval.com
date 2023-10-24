<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import type { WorkoutExerciseSet } from '$lib/stores/currentWorkout/types';
	import { getExercise } from '$lib/utils/context';

	export let exerciseId: string;
	export let setId: string;

	const { exerciseSets, updateExerciseSet } = getExercise(exerciseId);

	const set: WorkoutExerciseSet = $exerciseSets.find((set) => set.id === setId)!;

	let checked = set.done;
	let timer: NodeJS.Timeout;
	const TIMEOUT = 5000;

	const update = async (d: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			updateExerciseSet(setId, {
				done: typeof d === 'boolean' ? d : false
			});
		}, TIMEOUT);
	};

	$: update(checked);
</script>

<Checkbox class="w-5 h-5 flex justify-center items-center mx-auto" bind:checked />
