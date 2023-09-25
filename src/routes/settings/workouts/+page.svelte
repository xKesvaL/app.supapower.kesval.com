<script lang="ts">
	import type { LayoutData } from '../$types';
	import type {
		UserDataStoreContext,
		UserDataWorkout,
		WorkoutType
	} from '$lib/firebase/user/types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import Image from '$lib/components/base/Image.svelte';
	import { updateUserDataWorkout } from '$lib/firebase/user/actions';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const userData: UserDataStoreContext = getContext('userData');
	let loading = false;

	const workout: UserDataWorkout = {
		type: $userData?.workout.type ?? 'powerbuilding',
		frequency: $userData?.workout.frequency ?? 4
	};

	const handleSave = async () => {
		loading = true;

		updateUserDataWorkout($userData?.uid, workout);

		loading = false;
	};

	const switchToWorkoutType = (e: MouseEvent) => {
		const target = e.currentTarget as HTMLButtonElement;
		workout.type = target.dataset.workoutType as WorkoutType;
	};

	$: hasChangedWorkoutFrequency = workout.frequency !== $userData?.workout.frequency;
	$: hasChangedWorkoutType = workout.type !== $userData?.workout.type;
</script>

<SettingsHeader
	{fRel}
	on:save={handleSave}
	saveButtonEnabled={hasChangedWorkoutType || hasChangedWorkoutFrequency}
	{loading}
/>

<section>
	<form>
		<h2>{$t('workouts.types.label')}</h2>
		<div class="workoutTypes">
			<button
				class:active={workout.type === 'bodybuilding'}
				on:click={switchToWorkoutType}
				data-workout-type="bodybuilding"
				type="button"
			>
				<span> {$t('workouts.types.bodybuilding.name')} </span>
				<div class="img">
					<Image
						src="/images/flows/register/bodybuilding.png"
						alt={$t('workouts.types.bodybuilding.name')}
						objectFit="contain"
					/>
				</div>
			</button>
			<button
				class:active={workout.type === 'powerbuilding'}
				on:click={switchToWorkoutType}
				data-workout-type="powerbuilding"
				type="button"
			>
				<span> {$t('workouts.types.powerbuilding.name')} </span>
				<div class="img">
					<Image
						src="/images/flows/register/powerbuilding.png"
						alt={$t('workouts.types.powerbuilding.name')}
						objectFit="contain"
					/>
				</div>
			</button>
			<button
				class:active={workout.type === 'powerlifting'}
				on:click={switchToWorkoutType}
				data-workout-type="powerlifting"
				type="button"
			>
				<span> {$t('workouts.types.powerlifting.name')} </span>
				<div class="img">
					<Image
						src="/images/flows/register/powerlifting.png"
						alt={$t('workouts.types.powerlifting.name')}
						objectFit="contain"
					/>
				</div>
			</button>
		</div>
		<h2>{$t('workouts.frequencies.label')}</h2>
		<div>
			<input
				type="range"
				name="frequency"
				min="2"
				max="6"
				class="primary"
				bind:value={workout.frequency}
			/>
			<div class="frequencies">
				<span>2 {$t('std.days')}</span>
				<span>3 {$t('std.days')}</span>
				<span>4 {$t('std.days')}</span>
				<span>5 {$t('std.days')}</span>
				<span>6 {$t('std.days')}</span>
			</div>
		</div>
	</form>
</section>

<style lang="scss">
	section {
		padding: 1rem;

		h2 {
			font-size: var(--fs-600);
		}

		.workoutTypes {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;

			button {
				height: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				min-width: 130px;
				max-height: 160px;
				border: 3px solid transparent;
				border-radius: 0.5rem;
				flex: 1;
				gap: 1rem;
				background: radial-gradient(rgba(var(--base-200-rgb), 0.3), rgba(var(--base-200-rgb), 0.7));

				&.active {
					border-color: var(--primary-500);
				}

				span {
					font-size: var(--fs-200);
					text-align: center;
				}

				.img {
					height: 100%;
					width: 100%;
					max-height: 110px;
					flex: 1 0 auto;
				}
			}
		}

		.frequencies {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;
			font-size: var(--fs-400);
			font-weight: 700;
			color: var(--base-800);
			text-align: center;
			margin-top: 1rem;

			span {
				position: relative;
				font-weight: 400;

				&::before {
					content: '';
					display: block;
					width: 1px;
					height: 1rem;
					background: var(--base-600);
					margin: 0 auto 0.5rem;
				}
			}
		}
	}
</style>
