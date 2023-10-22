<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import IconDotsVertical from '$lib/icons/IconDotsVertical.svelte';
	import IconX from '$lib/icons/IconX.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	export let exerciseId: string;

	const currentWorkout = getContext<CurrentWorkoutStoreContext>('currentWorkout');

	const removeExercise = () => {
		currentWorkout.removeExercise(exerciseId);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
			<span class="sr-only">
				{$t('pages.workout.log.actions.open')}
			</span>
			<div class="w-6 h-6">
				<IconDotsVertical />
			</div>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={removeExercise}>
				<div class="w-5 h-5 mr-2">
					<IconX />
				</div>
				<span> Discard Exercise </span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
