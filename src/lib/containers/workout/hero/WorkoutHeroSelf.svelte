<script>
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { t } from 'svelte-i18n';
	import WorkoutSelfCard from '../self/WorkoutSelfCard.svelte';
	import { PAGES } from '$lib/ROUTES';
</script>

<section class="container">
	<div class="self">
		<header>
			<h2>
				{$t('pages.workout.self.label')}
			</h2>
			<a class="button secondary" href={PAGES.workout_self()}>
				{capitalizeFirstLetter($t('std.all'))}
			</a>
		</header>
		<section class="list">
			{#each Array(5) as _}
				<WorkoutSelfCard />
			{/each}
		</section>
	</div>
</section>

<style lang="scss">
	section.container {
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

		.list {
			display: flex;
			gap: 0.5rem;
			margin-top: 1rem;
			overflow-x: auto;
			padding-block: 0.5rem;

			&::-webkit-scrollbar {
				height: 0.125rem;
			}
		}
	}
</style>
