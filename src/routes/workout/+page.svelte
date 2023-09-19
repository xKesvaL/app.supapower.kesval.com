<script lang="ts">
	import WorkoutHero from '$lib/containers/workout/WorkoutHero.svelte';
	import WorkoutListCommunity from '$lib/containers/workout/community/WorkoutListCommunity.svelte';
	import WorkoutListPredefined from '$lib/containers/workout/WorkoutListPredefined.svelte';
	import WorkoutListSelf from '$lib/containers/workout/self/WorkoutListSelf.svelte';
</script>

<WorkoutHero />
<WorkoutListSelf />
<WorkoutListCommunity />
<WorkoutListPredefined />
