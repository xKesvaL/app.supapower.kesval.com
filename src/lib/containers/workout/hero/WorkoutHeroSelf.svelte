<script>
	import { ROUTES } from '$lib/config';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<div class="self">
		<header>
			<h2>
				{$t('pages.workout.self.label')}
			</h2>
			<a class="button primary" href={ROUTES.workoutSelf}>
				{capitalizeFirstLetter($t('std.all'))}
			</a>
		</header>
		...
	</div>
</section>

<style lang="scss">
	section {
		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			h2 {
				font-size: var(--fs-600);
			}

			a {
				min-width: 4.25rem;
			}
		}
	}
</style>
