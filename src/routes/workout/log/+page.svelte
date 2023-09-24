<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { getContext } from 'svelte';

	import WorkoutLogHeader from '$lib/containers/workout/log/WorkoutLogHeader.svelte';
	import WorkoutLogStats from '$lib/containers/workout/log/WorkoutLogStats.svelte';

	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { createCurrentWorkout } from '$lib/firebase/workout/actions';
	import type { UserStoreContext } from '$lib/firebase/auth/types';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const user: UserStoreContext = getContext('user');
	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	$: if (!$currentWorkout) {
		createCurrentWorkout($user.uid);
	}
</script>

<WorkoutLogHeader {fRel} />
<WorkoutLogStats {currentWorkout} />
{#if !$currentWorkout}
	<section class="container load">
		<span class="loading" />
	</section>
{:else}
	<section class="container">ok</section>
{/if}

<style lang="scss">
	.container {
		&.load {
			display: flex;
			min-height: 70vh;
			width: 100%;
			align-items: center;
			justify-content: center;

			span {
				width: 4rem;
				height: 4rem;
			}
		}
	}
</style>
