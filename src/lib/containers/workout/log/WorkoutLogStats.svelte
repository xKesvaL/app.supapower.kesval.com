<script lang="ts">
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import dayjs from 'dayjs';
	import duration, { type Duration } from 'dayjs/plugin/duration';
	import { fly } from 'svelte/transition';

	export let currentWorkout: WorkoutStore;

	const userData: UserDataStoreContext = getContext('userData');

	dayjs.extend(duration);

	let durationDate: Duration = dayjs.duration(-dayjs($currentWorkout?.startDate).diff(new Date()));

	setInterval(() => {
		durationDate = dayjs.duration(-dayjs($currentWorkout?.startDate).diff(new Date()));
	}, 1000);

	let volume = 0;
	let sets = 0;

	$: if ($currentWorkout) {
		volume = 0;
		sets = 0;
		$currentWorkout.exercises.forEach((exercise) => {
			sets += exercise.sets.filter((set) => set.done).length;
			volume += exercise.sets.reduce(
				(acc, set) => acc + (set.done ? (set.weight || 0) * (set.reps || 0) : 0),
				0
			);
		});
	}
</script>

{#if $currentWorkout}
	<section class="container" transition:fly={{ opacity: 0, y: -80, duration: 300 }}>
		<div>
			<span>
				{capitalizeFirstLetter($t('pages.workout.log.duration'))}
			</span>
			{durationDate.format(
				durationDate.asHours() >= 1
					? `H[${$t('std.hoursMin')}] m[${$t('std.minutesMin')}] s[${$t('std.secondsMin')}]`
					: durationDate.asMinutes() >= 1
					? `m[${$t('std.minutesMin')}] s[${$t('std.secondsMin')}]`
					: `s[${$t('std.secondsMin')}]`
			)}
		</div>
		<div>
			<span>
				{capitalizeFirstLetter($t('pages.workout.log.volume'))}
			</span>
			{volume}
			{$userData.units.weight}
		</div>
		<div>
			<span>
				{capitalizeFirstLetter($t('pages.workout.log.sets'))}
			</span>
			{sets}
			{$t('pages.workout.log.sets')}
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		--ct-padding: 0.5rem 1rem;
		border-bottom: 1px solid rgba(var(--base-500-rgb), 0.5);
		display: grid;
		grid-template-columns: 3fr 2fr 2fr;
		position: relative;
		z-index: 10;

		div {
			display: flex;
			flex-direction: column;

			span {
				font-size: var(--fs-200);
				color: var(--base-600);
			}
		}
	}
</style>
