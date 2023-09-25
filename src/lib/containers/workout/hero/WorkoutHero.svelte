<script>
	import { ROUTES } from '$lib/config';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<div class="quick">
		<h2>
			{$t('pages.workout.quick.label')}
		</h2>
		<a class="button" href="{ROUTES.workoutLog}?frel={ROUTES.workout}">
			<div class="icon">
				<IconPlus />
			</div>
			{$t('pages.workout.quick.log')}
		</a>
	</div>
</section>

<style lang="scss">
	section {
		h2 {
			font-size: var(--fs-600);
		}

		.quick {
			display: grid;
			gap: 1rem;

			a {
				justify-content: flex-start;
				background: rgba(var(--base-200-rgb), 0.25);
				border: 1px solid rgba(var(--base-200-rgb), 0.5);
				gap: 0.75rem;
				align-items: center;
				height: auto;
				padding: 0.75rem 1rem;

				&:hover {
					background: rgba(var(--base-200-rgb), 0.5);
					border: 1px solid rgba(var(--base-200-rgb), 0.75);
				}

				.icon {
					width: 24px;
					height: 24px;
					color: var(--primary-700);
					margin-bottom: 0.125rem;
				}
			}
		}
	}
</style>
