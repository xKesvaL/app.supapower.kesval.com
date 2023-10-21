<script lang="ts">
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import dayjs from 'dayjs';
	import duration, { type Duration } from 'dayjs/plugin/duration';
	import { fly } from 'svelte/transition';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';

	const userData: UserDataStoreContext = getContext('userData');
	const { workoutDoc, exercisesCol } = getContext<CurrentWorkoutStoreContext>('currentWorkout');

	dayjs.extend(duration);

	let durationDate: Duration = dayjs.duration(-dayjs($workoutDoc?.startDate).diff(new Date()));

	setInterval(() => {
		durationDate = dayjs.duration(-dayjs($workoutDoc?.startDate).diff(new Date()));
	}, 1000);

	let volume = 0;
	let sets = 0;

	$: if ($workoutDoc && $exercisesCol) {
		volume = 0;
		sets = 0;
		$exercisesCol.forEach((exercise) => {
			sets += exercise.sets.filter((set) => set.done).length;
			volume += exercise.sets.reduce(
				(acc, set) => acc + (set.done ? (set.weight || 0) * (set.reps || 0) : 0),
				0
			);
		});
	}
</script>

{#if $workoutDoc}
	<section class="container" transition:fly={{ opacity: 0, y: -80, duration: 300 }}>
		<div>
			<span class="text-xs">
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
			<span class="text-xs">
				{capitalizeFirstLetter($t('pages.workout.log.volume'))}
			</span>
			{volume}
			{$userData.units.weight}
		</div>
		<div>
			<span class="text-xs">
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
		border-bottom: 1px solid hsl(var(--muted));
		display: grid;
		grid-template-columns: 3fr 2fr 2fr;
		position: relative;
		z-index: 10;

		div {
			display: flex;
			flex-direction: column;
			font-size: var(--fs-300);

			span {
				color: hsl(var(--base-600));
			}
		}
	}
</style>
