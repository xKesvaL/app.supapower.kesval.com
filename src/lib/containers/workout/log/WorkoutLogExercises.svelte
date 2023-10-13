<script lang="ts">
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import type { WorkoutStoreContext } from '$lib/firebase/workout/types';
	import IconCheck from '$lib/icons/IconCheck.svelte';
	import IconDotsVertical from '$lib/icons/IconDotsVertical.svelte';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	const currentWorkout: WorkoutStoreContext = getContext('currentWorkout');
	const userData: UserDataStoreContext = getContext('userData');

	const addSet = () => {}
</script>

<section class="container">
	{#each $currentWorkout.exercises as exercise}
		<div class="exercise">
			<header>
				<div class="image">img</div>
				<h2>{$t(`exercises.${exercise.exerciseName}.name`)}</h2>
				<a href="/" class="more">
					<IconDotsVertical />
				</a>
			</header>
			<table class="table-zebra">
				<thead>
					<tr>
						<th>{$t('pages.workout.log.set')}</th>
						<th>{$t('pages.workout.log.previous')}</th>
						<th>{$userData.units.weight}</th>
						<th>{$t('pages.workout.log.reps')}</th>
						<th>{$t('pages.workout.log.rpe')}</th>
						<th class="icon">
							<IconCheck />
						</th>
					</tr>
				</thead>
				<tbody>
					{#each exercise.sets as set, i}
						<tr>
							<td>{set.type == 'working' ? i + 1 : $t('pages.workout.log.warmupInitial')}</td>
							<td></td>
							<td>{set.weight}</td>
							<td>{set.reps}</td>
							<td>{set.rpe}</td>
							<td>
								<input type="checkbox" name="done" class="primary" />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<button class="add-set">
				<div class="icon">
					<IconPlus />
				</div>
				{$t('pages.workout.log.addSet')}
			</button>
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

				thead {
					text-transform: uppercase;
					font-size: 0.75rem;

					.icon {
						width: 2.25rem;
					}
				}

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

					input[type='checkbox'] {
						height: 2rem;
						width: 1.25rem;
						border: none;
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

			.add-set {
				margin-top: 0.5rem;
				width: 100%;
				background: var(--base-200);
				font-weight: 400;
				gap: 0.25rem;

				.icon {
					width: 16px;
					height: 16px;
				}
			}
		}
	}
</style>
