<script>
	import { ROUTES } from '$lib/config';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<div class="community">
		<header>
			<h2>
				{$t('pages.workout.community.label')}
			</h2>
			<a class="button primary" href={ROUTES.workoutCommunity}>
				{capitalizeFirstLetter($t('std.more'))}</a
			>
		</header>
		<section class="list">
			{#each Array(5) as _}
				<a href={ROUTES.home}>caca, caca, caca</a>
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
			margin-block: 0.5rem;
			overflow-x: auto;
			padding-block: 0.5rem;

			&::-webkit-scrollbar {
				height: 0.125rem;
			}

			a {
				padding: 0.5rem;
				background: radial-gradient(
						65.31% 70.71% at 50% 50%,
						rgba(var(--primary-500-rgb), 0.1),
						rgba(var(--primary-300-rgb), 0.1)
					),
					var(--primary-50);
				min-width: 12rem;
				min-height: 7rem;
				flex: 1;
				border: 1px solid rgba(var(--base-500-rgb), 0.25);
				border-radius: 0.5rem;
				transition: 0.3s;

				&:hover {
					border-color: rgba(var(--base-500-rgb), 0.5);
				}
			}
		}
	}
</style>
