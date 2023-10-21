<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import IconX from '$lib/icons/IconX.svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';

	const dispatch = createEventDispatcher();

	const onDelete = () => {
		dispatch('delete');
	};
</script>

<Button variant="ghost" size="icon" class="relative w-8 h-8 p-0" on:click={onDelete}>
	<span class="sr-only">
		{$t('pages.workout.log.actions.open')}
	</span>
	<div class="w-6 h-6">
		<IconX />
	</div>
</Button>
