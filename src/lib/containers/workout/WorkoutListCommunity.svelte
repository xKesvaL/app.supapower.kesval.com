<script>
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<div class="community">
		<h2>
			{$t('pages.workout.community.label')}
		</h2>
		...
	</div>
</section>

<style lang="scss">
	section {
		h2 {
			font-size: var(--fs-600);
		}
	}
</style>
