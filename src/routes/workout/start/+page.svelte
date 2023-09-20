<script lang="ts">
	import WorkoutStartHeader from '$lib/containers/workout/start/WorkoutStartHeader.svelte';
	import type { LayoutData } from '../../$types';
	import WorkoutStartStats from '$lib/containers/workout/start/WorkoutStartStats.svelte';

	export let data: LayoutData;

	$: ({ fRel } = data);
</script>

<WorkoutStartHeader {fRel} />
<WorkoutStartStats />
<section class="container">ok</section>
