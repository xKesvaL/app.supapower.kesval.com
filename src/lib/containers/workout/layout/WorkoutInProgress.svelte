<script>
	import { page } from '$app/stores';
	import { ROUTES } from '$lib/config';
	import IconPlayerPlay from '$lib/icons/IconPlayerPlay.svelte';
	import IconX from '$lib/icons/IconX.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { t } from 'svelte-i18n';
	import WorkoutInProgressDiscardModal from './WorkoutInProgressDiscardModal.svelte';
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';

	export let shown = true;

	const showDiscardModal = () => {
		currentWorkoutDiscardModalState.set(true);
	};
</script>

<WorkoutInProgressDiscardModal />
<footer class:hidden={!shown}>
	<div class="in-progress">{$t('std.workoutInProgress')}</div>
	<div class="actions">
		<a href="{ROUTES.workoutLog}?frel={$page.url.pathname}" class="button resume">
			<div class="icon">
				<IconPlayerPlay />
			</div>
			{capitalizeFirstLetter($t('std.resume'))}
		</a>
		<button class="button discard" on:click={showDiscardModal}>
			<div class="icon">
				<IconX />
			</div>
			{capitalizeFirstLetter($t('std.discard'))}
		</button>
	</div>
</footer>

<style lang="scss">
	footer {
		view-transition-name: workout-in-progress;

		position: fixed;
		left: 0;
		bottom: 3rem;
		right: 0;
		z-index: 15;

		box-shadow: 0 -1px 4px var(--base-200);
		background: var(--base-100);
		border-radius: 1rem 1rem 0 0;
		padding: 0.5rem 1rem 1rem 1rem;

		display: flex;
		flex-direction: column;

		gap: 0.5rem;

		&.hidden {
			transform: translateY(200%);
		}

		@include mq(lg) {
			left: 12rem;
			bottom: 0;
		}

		.in-progress {
			color: var(--base-700);
			font-size: var(--fs-300);
			text-align: center;
		}

		.actions {
			display: flex;
			justify-content: space-between;
			max-width: 24rem;
			width: 100%;
			margin: 0 auto;
			padding: 0 2rem;

			:where(a, button) {
				height: auto;
				padding: 0;
				background: none;
				font-weight: 400;
				gap: 0.5rem;

				.icon {
					width: 20px;
					height: 20px;
				}

				&.resume {
					color: var(--info-500);
				}

				&.discard {
					color: var(--danger-500);
				}
			}
		}
	}
</style>
