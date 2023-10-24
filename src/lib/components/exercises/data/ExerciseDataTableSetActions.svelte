<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import IconX from '$lib/icons/IconX.svelte';
	import { getExercise } from '$lib/utils/context';
	import { t } from 'svelte-i18n';

	export let exerciseId: string;
	export let setId: string;
	export let index: number;

	const { removeExerciseSet } = getExercise(exerciseId);

	const removeSet = async () => {
		removeExerciseSet(setId);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="relative w-full p-0 bg-muted h-10"
		>
			{index + 1}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={removeSet}>
				<div class="w-5 h-5 mr-2">
					<IconX />
				</div>
				<span> {$t('pages.workout.log.exercises.table.actions.removeSet')} </span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
