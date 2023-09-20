<script>
	import IconPlayerPlay from '$lib/icons/IconPlayerPlay.svelte';
	import IconX from '$lib/icons/IconX.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { t } from 'svelte-i18n';
</script>

<footer>
	<div class="in-progress">{$t('std.workoutInProgress')}</div>
	<div class="actions">
		<button class="resume">
			<div class="icon">
				<IconPlayerPlay />
			</div>
			{capitalizeFirstLetter($t('std.resume'))}
		</button>
		<button class="discard">
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
		z-index: 1000;

		background: var(--base-200);
		border-radius: 1rem 1rem 0 0;
		padding: 0.5rem 1rem 1rem 1rem;

		display: flex;
		flex-direction: column;

		gap: 0.5rem;

		@include mq(lg) {
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

			button {
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
