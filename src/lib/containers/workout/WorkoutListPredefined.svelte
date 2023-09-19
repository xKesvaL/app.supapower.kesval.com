<script lang="ts">
	import Card from '$lib/components/base/Card.svelte';
	import { programsList } from '$lib/data/programsList';
	import { t } from 'svelte-i18n';

	const openedPrograms: Record<string, boolean> = {};

	function toggleProgram(programName: string) {
		openedPrograms[programName] = !openedPrograms[programName];
	}
</script>

<section class="container">
	<h2>
		{$t('pages.workout.predefinedList.label')}
	</h2>
	{#each Object.entries(programsList) as [programName, programWorkouts]}
		<Card
			customCardStyle="max-width: auto; width: 100%; min-width: none;"
			customCardBgStyle="padding: 0;"
		>
			<button
				class="no-anim header"
				class:opened={openedPrograms[programName]}
				on:click={() => toggleProgram(programName)}
			>
				<h3>{$t(`pages.workout.predefinedList.${programName}.label`)}</h3>
			</button>
			<section class:opened={openedPrograms[programName]}>
				<div class="workouts">
					{#each Object.entries(programWorkouts) as [workoutName, workoutExercises]}
						<div class="workout">
							<div class="content">
								<h4>
									{$t(`pages.workout.predefinedList.${programName}.${workoutName}.label`)}
								</h4>
								<p>
									{workoutExercises.length}
									{$t('std.exercises')}
								</p>
							</div>
							<div class="start">
								<button class="primary">Start</button>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</Card>
	{/each}
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			font-size: var(--fs-600);
		}

		button.header {
			margin-bottom: -1rem;
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: none;
			height: auto;
			padding: 1rem;

			h3 {
				font-size: var(--fs-500);
			}

			&::after {
				content: '+';
				position: absolute;
				right: 1rem;
				font-size: var(--fs-700);
				transition: 0.3s ease;
			}

			&.opened {
				&::after {
					transform: rotate(45deg);
				}
			}
		}

		section {
			width: 100%;
			display: grid;
			grid-template-rows: 0fr;
			transition: 0.3s ease;
			padding: 1rem;
			padding-top: 0;
			padding-bottom: 0;

			&.opened {
				padding-bottom: 1rem;
				padding-top: 0.5rem;
				grid-template-rows: 1fr;
			}

			.workouts {
				overflow: hidden;
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.workout {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;

					h4 {
						font-family: var(--ft-sans);
					}

					&:not(:last-child) {
						padding-bottom: 1rem;
						border-bottom: 1px solid rgba(var(--base-500-rgb), 0.5);
					}
				}
			}
		}
	}
</style>
