<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import IconX from '$lib/icons/IconX.svelte';
	import { getExercise } from '$lib/utils/context';
	import { t } from 'svelte-i18n';

	export let exerciseId: string;
	export let setIndex: number;

	const { exerciseDoc, removeExerciseSet } = getExercise(exerciseId);

	const removeSet = async () => {
		removeExerciseSet($exerciseDoc?.sets || [], setIndex);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="relative w-full h-8 p-0 bg-muted"
		>
			{setIndex + 1}
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
