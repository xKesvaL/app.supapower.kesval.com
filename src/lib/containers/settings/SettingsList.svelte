<script lang="ts">
	import IconBarbell from '$lib/icons/IconBarbell.svelte';
	import IconChevronRight from '$lib/icons/IconChevronRight.svelte';
	import IconLanguage from '$lib/icons/IconLanguage.svelte';
	import IconLock from '$lib/icons/IconLock.svelte';
	import IconMoon from '$lib/icons/IconMoon.svelte';
	import IconRuler2 from '$lib/icons/IconRuler2.svelte';
	import IconUserCircle from '$lib/icons/IconUserCircle.svelte';
	import IconCirclesRelation from '$lib/icons/IconCirclesRelation.svelte';
	import { t } from 'svelte-i18n';
	import { PAGES } from '$lib/ROUTES';

	const frel = PAGES.settings();
</script>

<section>
	<nav>
		<div>
			<h2>{$t('pages.settings.list.yourAccount')}</h2>
			<a href={PAGES.settings_profile({ frel })}>
				<div class="icon">
					<IconUserCircle />
				</div>
				{$t('pages.settings.list.profile.label')}
				<span class="icon">
					<IconChevronRight />
				</span>
			</a>
			<a href={PAGES.settings_account({ frel })}>
				<div class="icon">
					<IconLock />
				</div>
				{$t('pages.settings.list.account.label')}
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
			<a href={PAGES.settings_connections({ frel })}>
				<div class="icon">
					<IconCirclesRelation />
				</div>
				{$t('pages.settings.list.connections.label')}
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
		</div>
		<div>
			<h2>{$t('pages.settings.list.preferences')}</h2>
			<a href={PAGES.settings_workouts({ frel })}>
				<div class="icon">
					<IconBarbell />
				</div>
				{$t('pages.settings.list.workouts.label')}
				<span class="icon">
					<IconChevronRight />
				</span>
			</a>
			<a href={PAGES.settings_units({ frel })}>
				<div class="icon">
					<IconRuler2 />
				</div>
				{$t('pages.settings.list.units.label')}
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
			<a href={PAGES.settings_language({ frel })}>
				<div class="icon">
					<IconLanguage />
				</div>
				{$t('pages.settings.list.language.label')}
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
			<a href={PAGES.settings_theme({ frel })}>
				<div class="icon">
					<IconMoon />
				</div>
				{$t('pages.settings.list.theme.label')}
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
		</div>
	</nav>
</section>

<style lang="scss">
	:global(html)::view-transition-old(settings-list),
	:global(html)::view-transition-new(settings-list) {
		width: 100%;
		height: 100%;
	}

	section {
		@include mq(lg) {
			view-transition-name: settings-list;
		}

		nav {
			display: grid;
			gap: 1rem;

			& > div {
				background: hsl(var(--base-200) / 0.7);
				padding: 0 1rem;

				h2 {
					font-size: var(--fs-200);
					color: hsl(var(--base-900) / 0.7);
					font-family: var(--ft-sans);
					font-weight: 300 !important;
					margin-bottom: 0.25rem;
					padding-top: 1rem;
				}
				a {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					width: 100%;
					font-size: var(--fs-400);
					padding: 1rem 0;
					border-bottom: 1px solid rgba(var(--base-200-rgb), 1);
					gap: 0.75rem;

					.icon {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 32px;
						height: 32px;
					}

					span.icon {
						margin-left: auto;
						color: var(--base-600);
						width: 26px;
						height: 26px;
					}
				}

				a:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
