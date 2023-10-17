<script lang="ts">
	import type { ExerciseName } from '$lib/data/types/exerciseTypes';
	import { exerciseList } from '$lib/data/exerciseList';
	import IconInfoCircle from '$lib/icons/IconInfoCircle.svelte';
	import { t } from 'svelte-i18n';
	import autoAnimate from '@formkit/auto-animate';
	import { fly } from 'svelte/transition';
	import type {
		WorkoutExercise,
		WorkoutExerciseSetType,
		WorkoutStore
	} from '$lib/firebase/workout/types';
	import { getContext } from 'svelte';
	import {
		createCurrentWorkout,
		updateCurrentWorkoutExercises
	} from '$lib/firebase/workout/actions';
	import type { UserStoreContext } from '$lib/firebase/auth/types';
	import { goto } from '$app/navigation';

	export let fRel: string;

	let selectedExercises: ExerciseName[] = [];

	const user: UserStoreContext = getContext('user');
	const currentWorkout: WorkoutStore = getContext('currentWorkout');

	const selectExercise = (exercise: ExerciseName) => {
		if (selectedExercises.includes(exercise)) {
			selectedExercises = selectedExercises.filter((e) => e !== exercise);
			return;
		}

		selectedExercises = [...selectedExercises, exercise];
	};

	const addExercisesToWorkout = async () => {
		if (!$currentWorkout) {
			await createCurrentWorkout($user.uid, {
				startDate: new Date().toISOString(),
				endDate: null,
				exercises: selectedExercises.map((e): WorkoutExercise => {
					return {
						exerciseName: e,
						sets: [
							{
								reps: null,
								weight: null,
								rpe: null,
								type: 'working',
								done: false
							}
						],
						timer: 120
					};
				})
			});

			await goto(fRel);
		} else {
			await updateCurrentWorkoutExercises($user.uid, [
				...$currentWorkout.exercises,
				...selectedExercises.map((e): WorkoutExercise => {
					return {
						exerciseName: e,
						sets: [
							{
								reps: null,
								weight: null,
								rpe: null,
								type: 'working' as WorkoutExerciseSetType,
								done: false
							}
						],
						timer: 120
					};
				})
			]);

			await goto(fRel);
		}
	};
</script>

<section class="container">
	{#each exerciseList as exercise}
		<button
			on:click={() => selectExercise(exercise.name)}
			class="exercise no-anim"
			use:autoAnimate={{ duration: 200 }}
		>
			{#if selectedExercises.includes(exercise.name)}
				<div class="selected" />
			{/if}
			<div class="image">img</div>
			<div class="description">
				<h2>
					{$t(`exercises.${exercise.name}.name`)}
				</h2>
				<p>
					{$t(`muscles.${exercise.primaryMuscle.name}`)}
				</p>
			</div>
			<a href="/" class="more">
				<IconInfoCircle />
			</a>
		</button>
	{/each}
</section>
{#if selectedExercises.length > 0}
	<button
		class="add primary"
		transition:fly={{ y: 20, duration: 300, opacity: 0 }}
		on:click={addExercisesToWorkout}
	>
		{$t(`pages.workout.addExercise.add${selectedExercises.length > 0 ? 's' : ''}`, {
			values: { count: selectedExercises.length }
		})}
	</button>
{/if}

<style lang="scss">
	button.add {
		position: fixed;
		bottom: 4rem;
		left: 1rem;
		right: 1rem;
	}

	section.container {
		button.exercise {
			width: 100%;
			height: auto;
			padding: 0.75rem 0rem 0.75rem 0.5rem;
			justify-content: flex-start;
			gap: 1rem;
			background: none;
			border-bottom: 1px solid var(--base-500);
			border-radius: 0;

			&:last-child {
				border-bottom: none;
			}

			.selected {
				width: 0.25rem;
				height: 3rem;
				background: var(--primary-500);
				border-radius: 0.25rem;
				margin-right: -0.25rem;
			}

			.image {
				width: 3rem;
				height: 3rem;
				background: var(--base-950);
				border-radius: 9999px;
				overflow: hidden;
			}

			.description {
				text-align: left;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;

				h2 {
					font-size: var(--fs-500);
					font-weight: 400;
				}

				p {
					font-size: var(--fs-400);
					font-weight: 300;
					color: var(--base-700);
				}
			}

			.more {
				width: 48px;
				height: 48px;
				padding: 12px;
				margin-left: auto;
				color: var(--secondary-500);
			}
		}
	}
</style>
