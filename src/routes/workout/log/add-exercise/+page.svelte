<script lang="ts">
	import AddExercise from '$lib/containers/workout/exercises/AddExercise.svelte';
	import AddExerciseHeader from '$lib/containers/workout/exercises/AddExerciseHeader.svelte';
	import type { LayoutData } from '../../../$types';

	export let data: LayoutData;

	$: ({ fRel } = data);
</script>

<AddExerciseHeader {fRel} />
<AddExercise />
