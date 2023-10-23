<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { getExercise } from '$lib/utils/context';

	export let defaultChecked = false;
	export let exerciseId: string;
	export let setIndex: number;

	let checked = defaultChecked;

	const { exerciseDoc } = getExercise(exerciseId);

	const updateChecked = async (check: boolean | 'indeterminate' | undefined) => {
		await exerciseDoc.update({
			sets:
				$exerciseDoc?.sets.map((set, index) => {
					if (index === setIndex) {
						return {
							...set,
							done: typeof check === 'boolean' ? check : false
						};
					}
					return set;
				}) || []
		});
	};
</script>

<Checkbox
	class="w-5 h-5 flex justify-center items-center mx-auto"
	bind:checked
	onCheckedChange={updateChecked}
/>
