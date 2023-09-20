<script>
	import Card from '$lib/components/base/Card.svelte';
	import { ROUTES } from '$lib/config';
	import IconBarbell from '$lib/icons/IconBarbell.svelte';
	import IconCalendarEvent from '$lib/icons/IconCalendarEvent.svelte';
	import IconMan from '$lib/icons/IconMan.svelte';
	import IconTimeline from '$lib/icons/IconTimeline.svelte';
	import { t } from 'svelte-i18n';
</script>

<section class="container">
	<h2>{$t('pages.profile.dashboard.label')}</h2>
	<div class="dashboard">
		<Card customCardStyle="min-width: 0;" href={ROUTES.profile}>
			<div class="dashboard-link">
				<div class="icon">
					<IconTimeline />
				</div>
				<span> {$t('pages.profile.dashboard.statistics.label')} </span>
			</div>
		</Card>
		<Card customCardStyle="min-width: 0;" href={ROUTES.profile}>
			<div class="dashboard-link">
				<div class="icon">
					<IconBarbell />
				</div>
				<span> {$t('pages.profile.dashboard.exercises.label')} </span>
			</div>
		</Card>
		<Card customCardStyle="min-width: 0;" href={ROUTES.profile}>
			<div class="dashboard-link">
				<div class="icon">
					<IconMan />
				</div>
				<span> {$t('pages.profile.dashboard.measures.label')} </span>
			</div>
		</Card>
		<Card customCardStyle="min-width: 0;" href={ROUTES.profile}>
			<div class="dashboard-link">
				<div class="icon">
					<IconCalendarEvent />
				</div>
				<span> {$t('pages.profile.dashboard.calendar.label')} </span>
			</div>
		</Card>
	</div>
</section>

<style lang="scss">
	section {
		h2 {
			font-size: var(--fs-600);
			margin-bottom: 1rem;
		}

		.dashboard {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;

			@include mq(md) {
				grid-template-columns: repeat(4, 1fr);
			}

			.dashboard-link {
				display: flex;

				align-items: center;
				justify-content: center;
				width: 100%;
				gap: 0.75rem;
				font-size: var(--fs-500);
				margin: -0.25rem;

				.icon {
					width: 28px;
					height: 28px;
					flex: 0 0 28px;
				}
			}
		}
	}
</style>
