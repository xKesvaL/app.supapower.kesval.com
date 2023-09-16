<script>
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<div class="self">
		<h2>
			{$t('pages.workout.self.label')}
		</h2>
		...
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

			button {
				justify-content: flex-start;
				background: var(--base-200);
				gap: 0.75rem;
				align-items: center;
				height: auto;
				padding: 0.75rem 1rem;

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
