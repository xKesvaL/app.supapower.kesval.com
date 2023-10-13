<script>
	import { Button } from '$lib/components/ui/button';
	import { ROUTES } from '$lib/config';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<div class="quick">
		<h2>
			{$t('pages.workout.quick.label')}
		</h2>
		<Button href="{ROUTES.workoutLog}?frel={ROUTES.workout}" class="gap-2">
			<div class="w-6 h-6">
				<IconPlus />
			</div>
			{$t('pages.workout.quick.log')}
		</Button>
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
		}
	}
</style>
