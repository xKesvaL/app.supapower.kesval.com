<script lang="ts">
	import WorkoutStartHeader from '$lib/containers/workout/start/WorkoutStartHeader.svelte';
	import type { UserDataStore } from '$lib/firebase/user/types';
	import { getContext } from 'svelte';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;

	const userData: UserDataStore = getContext('userData');

	$: ({ fRel } = data);
</script>

<WorkoutStartHeader {fRel} />
<section class="container">ok</section>
