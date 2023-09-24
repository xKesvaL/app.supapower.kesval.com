<script lang="ts">
	import Overlay from '$lib/components/layout/Overlay.svelte';
	import { deleteCurrentWorkout } from '$lib/firebase/workout/actions';
	import IconX from '$lib/icons/IconX.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import { blur } from 'svelte/transition';

	export let shown = false;
	let loading = false;

	const dispatcher = createEventDispatcher();

	const closeDiscardModal = () => {
		dispatcher('close');
	};

	const discard = async () => {
		loading = true;

		await deleteCurrentWorkout();

		loading = false;
		dispatcher('close');
	};
</script>

{#if shown}
	<Overlay />
	<div class="modal" transition:blur={{ amount: 1, duration: 300 }}>
		<header>
			<h2>{$t('pages.workout.log.discardModal.title')}</h2>
			<button class="icon" on:click={closeDiscardModal}>
				<IconX />
			</button>
		</header>
		<div class="content">
			{$t('pages.workout.log.discardModal.content')}
		</div>
		<footer>
			<button class="primary" on:click={closeDiscardModal}>
				{capitalizeFirstLetter($t('std.cancel'))}
			</button>
			<button class="danger" on:click={discard}>
				{#if loading}
					<span class="loading" />
				{:else}
					{$t('pages.workout.log.discardModal.discard')}
				{/if}
			</button>
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

		background: var(--base-100);

		border-radius: 0.5rem;
		border: 1px solid rgba(var(--base-800-rgb), 0.5);

		box-shadow: 0 0 8px 0 rgba(var(--base-200-rgb), 1);

		max-width: min(calc(100% - 2rem), 30rem);

		width: 100vw;

		header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			h2 {
				font-size: var(--fs-600);
				padding-left: 1rem;
			}

			.icon {
				width: 48px;
				height: 48px;
				padding: 10px;
				background: none;

				:global(svg) {
					stroke-width: 2;
				}
			}
		}

		.content {
			padding: 0 1rem;
		}

		footer {
			padding: 1rem;
			display: flex;
			gap: 0.5rem;
			justify-content: flex-end;
		}
	}
</style>
