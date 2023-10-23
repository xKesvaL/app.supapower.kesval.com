<script lang="ts">
	import type { ExerciseName } from '$lib/data/types/exerciseTypes';
	import { exerciseList } from '$lib/data/exerciseList';
	import IconInfoCircle from '$lib/icons/IconInfoCircle.svelte';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import type { CurrentWorkoutStore, WorkoutExercise } from '$lib/stores/currentWorkout/types';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	export let fRel: string;

	let selectedExercises: ExerciseName[] = [];
	let search: string = '';

	const { workoutDoc, exercisesCol, ...currentWorkout }: CurrentWorkoutStore =
		getContext('currentWorkout');

	const selectExercise = (exercise: ExerciseName) => {
		if (selectedExercises.includes(exercise)) {
			selectedExercises = selectedExercises.filter((e) => e !== exercise);
			return;
		}

		selectedExercises = [...selectedExercises, exercise];
	};

	const addExercisesToWorkout = async (exercises: ExerciseName[]) => {
		if (!$workoutDoc) {
			await currentWorkout.createWorkout({
				startDate: new Date().toISOString(),
				endDate: null
			});
		}

		await currentWorkout.addExercises(
			exercises.map((e) => {
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
				} satisfies WorkoutExercise;
			})
		);

		await goto(fRel);
	};
</script>

<section class="container flex flex-col gap-4">
	<Input name="search" bind:value={search} />
	<div>
		{#each exerciseList as exercise}
			<button
				on:click={() => selectExercise(exercise.name)}
				class="w-full px-2 py-3 gap-4 flex border-b last:border-none items-center relative"
			>
				{#if selectedExercises.includes(exercise.name)}
					<div
						class="h-12 rounded-full my-auto w-1 bg-primary absolute left-0"
						transition:fly={{ x: -20, duration: 200 }}
					/>
				{/if}
				<div
					class="rounded-full bg-muted w-12 h-12 flex justify-center items-center transition-all duration-200"
					style={selectedExercises.includes(exercise.name)
						? 'margin-left: 8px;'
						: 'margin-left: 0;'}
				>
					img
				</div>
				<div class="grid text-left flex-grow">
					<h2 class="font-sans !font-bold text-lg leading-tight">
						{$t(`exercises.${exercise.name}.name`)}
					</h2>
					<p>
						{$t(`muscles.${exercise.primaryMuscle.name}`)}
					</p>
				</div>
				<Button
					href="/"
					size="icon"
					class="p-2 bg-transparent hover:bg-transparent text-muted-foreground"
				>
					<IconInfoCircle />
				</Button>
			</button>
		{/each}
	</div>
</section>
{#if selectedExercises.length > 0}
	<div class="fixed bottom-16 left-4 right-4" transition:fly={{ y: 20, duration: 300, opacity: 0 }}>
		<Button class="w-full" on:click={() => addExercisesToWorkout(selectedExercises)}>
			{$t(`pages.workout.addExercise.add${selectedExercises.length > 1 ? 's' : ''}`, {
				values: { count: selectedExercises.length }
			})}
		</Button>
	</div>
{/if}
