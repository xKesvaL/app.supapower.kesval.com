<script lang="ts">
	import WorkoutHero from '$lib/containers/workout/WorkoutHero.svelte';
	import WorkoutListCommunity from '$lib/containers/workout/WorkoutListCommunity.svelte';
	import WorkoutListPredefined from '$lib/containers/workout/WorkoutListPredefined.svelte';
	import WorkoutListSelf from '$lib/containers/workout/WorkoutListSelf.svelte';
</script>

<WorkoutHero />
<WorkoutListSelf />
<WorkoutListCommunity />
<WorkoutListPredefined />
