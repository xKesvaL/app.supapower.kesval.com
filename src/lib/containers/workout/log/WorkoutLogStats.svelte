<script lang="ts">
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import type { WorkoutStore } from '$lib/firebase/workout/types';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import dayjs from 'dayjs';
	import duration, { type Duration } from 'dayjs/plugin/duration';

	export let currentWorkout: WorkoutStore;

	const userData: UserDataStoreContext = getContext('userData');

	dayjs.extend(duration);

	let durationDate: Duration = dayjs.duration(-dayjs($currentWorkout?.startDate).diff(new Date()));

	setInterval(() => {
		durationDate = dayjs.duration(-dayjs($currentWorkout?.startDate).diff(new Date()));
	}, 1000);
</script>

{#if $currentWorkout}
	<section class="container">
		<div>
			<span>
				{capitalizeFirstLetter($t('pages.workout.log.duration'))}
			</span>
			{durationDate.format(
				durationDate.asHours() >= 1
					? `HH[${$t('std.hoursMin')}] mm[${$t('std.minutesMin')}] ss[${$t('std.secondsMin')}]`
					: `mm[${$t('std.minutesMin')}] ss[${$t('std.secondsMin')}]`
			)}
		</div>
		<div>
			<span>
				{capitalizeFirstLetter($t('pages.workout.log.volume'))}
			</span>
			420 {$userData.units.weight}
		</div>
		<div>
			<span>
				{capitalizeFirstLetter($t('pages.workout.log.sets'))}
			</span>
			69 {$t('pages.workout.log.sets')}
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		--ct-padding: 0.5rem 1rem;
		border-bottom: 1px solid rgba(var(--base-500-rgb), 0.5);
		display: grid;
		grid-template-columns: 3fr 2fr 2fr;

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
