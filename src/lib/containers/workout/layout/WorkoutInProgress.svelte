<script>
	import { page } from '$app/stores';
	import { ROUTES } from '$lib/config';
	import IconPlayerPlay from '$lib/icons/IconPlayerPlay.svelte';
	import IconX from '$lib/icons/IconX.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { t } from 'svelte-i18n';
	import WorkoutInProgressDiscardModal from './WorkoutInProgressDiscardModal.svelte';
	import { currentWorkoutDiscardModalState } from '$lib/stores/currentWorkoutDiscardModal';
	import { Button } from '$lib/components/ui/button';

	export let shown = true;

	const showDiscardModal = () => {
		currentWorkoutDiscardModalState.set(true);
	};
</script>

<div class="padding">
	<!-- This is just to avoid content being under the workout in progress indicator -->
</div>
<WorkoutInProgressDiscardModal />
<footer class:hidden={!shown}>
	<div class="in-progress">{$t('std.workoutInProgress')}</div>
	<div class="actions">
		<Button
			href="{ROUTES.workoutLog}?frel={$page.url.pathname}"
			class="bg-transparent hover:bg-transparent p-0 gap-2 text-sm h-auto text-info"
		>
			<div class="w-6 h-6">
				<IconPlayerPlay />
			</div>
			{capitalizeFirstLetter($t('std.resume'))}
		</Button>
		<Button
			class="bg-transparent hover:bg-transparent p-0 gap-2 text-sm h-auto text-destructive"
			on:click={showDiscardModal}
		>
			<div class="w-6 h-6">
				<IconX />
			</div>
			{capitalizeFirstLetter($t('std.discard'))}
		</Button>
	</div>
</footer>

<style lang="scss">
	.padding {
		height: 5rem;
		width: 100%;

		@include mq(lg) {
			display: none;
		}
	}

	footer {
		view-transition-name: workout-in-progress;

		position: fixed;
		left: 0;
		bottom: 3rem;
		right: 0;
		z-index: 15;

		box-shadow: 0 -1px 4px hsl(var(--base-200));
		background: hsl(var(--base-100));
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
			color: hsl(var(--base-700));
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
		}
	}
</style>
