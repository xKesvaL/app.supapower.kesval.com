<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PAGES } from '$lib/ROUTES';
	import { Button } from '$lib/components/ui/button';
	import IconX from '$lib/icons/IconX.svelte';
	import type { CurrentWorkoutStoreContext } from '$lib/stores/currentWorkout/types';
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { blur } from 'svelte/transition';

	let loading = false;

	const currentWorkout: CurrentWorkoutStoreContext = getContext('currentWorkout');

	const closeDiscardModal = () => {
		currentWorkoutDiscardModalState.set(false);
	};

	const discard = async () => {
		loading = true;

		await currentWorkout.deleteWorkout();

		loading = false;
		currentWorkoutDiscardModalState.set(false);
		if ($page.url.pathname.startsWith(PAGES.workout())) {
			await goto(PAGES._ROOT());
		}
	};
</script>

{#if $currentWorkoutDiscardModalState}
	<div class="modal p-4 flex flex-col gap-4" transition:blur={{ amount: 1, duration: 300 }}>
		<header class="-my-2">
			<h2>{$t('pages.workout.log.discardModal.discard')}</h2>
			<Button
				size="icon"
				class="p-2 bg-transparent hover:bg-transparent text-foreground"
				on:click={closeDiscardModal}
			>
				<IconX />
			</Button>
		</header>
		<div class="content">
			{$t('pages.workout.log.discardModal.content')}
		</div>
		<footer class="flex justify-end gap-2">
			<Button on:click={closeDiscardModal}>
				{capitalizeFirstLetter($t('std.cancel'))}
			</Button>
			<Button variant="destructive" on:click={discard}>
				{#if loading}
					<span class="loading" />
				{:else}
					{$t('pages.workout.log.discardModal.discard')}
				{/if}
			</Button>
		</footer>
	</div>
{/if}

<style lang="scss">
	div.modal {
		view-transition-name: workout-modal-discard;

		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 10000;

		transform: translate(-50%, -50%);

		background: hsl(var(--base-100));

		border-radius: 0.5rem;
		border: 1px solid hsl(var(--base-500) / 0.5);

		box-shadow: 0 0 8px 0 hsl(var(--base-200) / 1);

		max-width: min(calc(100% - 2rem), 30rem);

		width: 100vw;

		header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			h2 {
				font-size: var(--fs-600);
			}
		}
	}
</style>
