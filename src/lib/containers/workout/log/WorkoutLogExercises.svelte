<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import { updateSetsOfCurrentWorkoutExercise } from '$lib/firebase/workout/actions';
	import type { WorkoutStoreContext } from '$lib/firebase/workout/types';
	import IconCheck from '$lib/icons/IconCheck.svelte';
	import IconDotsVertical from '$lib/icons/IconDotsVertical.svelte';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import IconX from '$lib/icons/IconX.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';

	const currentWorkout: WorkoutStoreContext = getContext('currentWorkout');
	const userData: UserDataStoreContext = getContext('userData');

	const addSet = async (index: number) => {
		const exercises = $currentWorkout.exercises;
		exercises[index]?.sets.push({
			reps: null,
			weight: null,
			rpe: null,
			type: 'working',
			done: false,
			timer: 120
		});

		updateSetsOfCurrentWorkoutExercise($userData.uid, exercises);
	};

	const removeSet = async (index: number, set: number) => {
		const exercises = $currentWorkout.exercises;

		exercises[index]?.sets.splice(set, 1);

		updateSetsOfCurrentWorkoutExercise($userData.uid, exercises);
	};
</script>

<section class="container">
	{#each $currentWorkout.exercises as exercise, ind}
		<div class="exercise" use:autoAnimate>
			<header>
				<div class="image">img</div>
				<h2>{$t(`exercises.${exercise.exerciseName}.name`)}</h2>
				<a href="/" class="more">
					<IconDotsVertical />
				</a>
			</header>
			<table class="w-full">
				<thead class="text-sm">
					<tr class="uppercase">
						<th class="align-middle">{$t('pages.workout.log.set')}</th>
						<th class="align-middle">{$userData.units.weight}</th>
						<th class="align-middle">{$t('pages.workout.log.reps')}</th>
						<th class="align-middle">{$t('pages.workout.log.rpe')}</th>
						<th class="align-middle w-6 h-6">
							<IconCheck />
						</th>
						<th class="align-middle"></th>
					</tr>
				</thead>
				<tbody>
					{#each exercise.sets as set, i}
						<tr
							class="font-bold text-base"
							in:fly={{
								y: -15,
								duration: 300
							}}
						>
							<td class="align-middle"
								>{set.type == 'working' ? i + 1 : $t('pages.workout.log.warmupInitial')}</td
							>
							<td class="align-middl">
								<Input
									name={`set-${i}-weight`}
									placeholder={set.weight?.toString() || '0'}
									class="p-0 border-none flex justify-center items-center text-center text-base placeholder:text-muted-foreground/50 align-middle"
									type="number"
								/>
							</td>
							<td class="align-middle"
								><Input
									name={`set-${i}-reps`}
									placeholder={set.reps?.toString() || '0'}
									class="p-0 border-none flex justify-center items-center text-center text-base placeholder:text-muted-foreground/50 align-middle"
									type="number"
								/></td
							>
							<td class="align-middle"
								><Input
									min="0"
									max="10"
									pattern="[1-9]|10"
									name={`set-${i}-rpe`}
									placeholder={set.rpe?.toString() || '...'}
									class="p-0 border-none flex justify-center items-center text-center text-base placeholder:text-muted-foreground/50 align-middle"
									type="number"
								/></td
							>
							<td class="align-middle">
								<Checkbox name="set-${i}-done" class="w-5 h-5 flex justify-center items-center" />
							</td>
							<td class="align-middle">
								<Button
									size="icon"
									on:click={() => removeSet(ind, i)}
									class="h-6 w-6 align-middle bg-transparent hover:bg-transparent"
								>
									<IconX />
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<Button class="gap-2 w-full" variant="secondary" on:click={() => addSet(ind)}>
				<div class="w-6 h-6">
					<IconPlus />
				</div>
				{$t('pages.workout.log.addSet')}
			</Button>
		</div>
	{/each}
</section>

<style lang="scss">
	section.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.exercise {
			header {
				display: flex;
				align-items: center;
				gap: 0.75rem;

				.image {
					width: 3rem;
					height: 3rem;
					background: var(--base-950);
					border-radius: 9999px;
					overflow: hidden;
				}

				h2 {
					font-size: var(--fs-500);
					font-weight: 700;
				}

				.more {
					margin-left: auto;
					color: var(--secondary-500);
				}
			}

			table {
				margin-top: 0.5rem;

				tbody {
					font-size: var(--fs-200);

					tr {
						&:nth-child(even) {
							background: rgba(var(--base-200-rgb), 0.5);
						}

						&:last-child {
							border-bottom: none;
						}
					}
				}

				thead,
				tbody {
					background: transparent;
					text-align: center;
					font-weight: 300;

					tr th,
					tr td {
						padding: 0.5rem;
					}
				}
			}
		}
	}
</style>
