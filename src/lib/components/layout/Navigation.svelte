<script>
	import IconHouse from '$lib/icons/IconHouse.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import IconUser from '$lib/icons/IconUser.svelte';
	import IconBarbell from '$lib/icons/IconBarbell.svelte';
</script>

<nav>
	<a href="/" class:active={$page.url.pathname === '/'}>
		<div class="icon">
			<IconHouse />
		</div>
		<span>{$t('pages.home.label')}</span>
	</a>
	<a href="/workout" class:active={$page.url.pathname.startsWith('/workout')}>
		<div class="icon">
			<IconBarbell />
		</div>
		<span>{$t('pages.workout.label')}</span>
	</a>
	<a href="/profile" class:active={$page.url.pathname.startsWith('/profile')}>
		<div class="icon">
			<IconUser />
		</div>
		<span>{$t('pages.profile.label')}</span>
	</a>
</nav>

<style lang="scss">
	nav {
		view-transition-name: navigation;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3rem;
		background: rgba(var(--base-200-rgb), 0.75);
		box-shadow: 0 -1px 4px rgba(var(--base-200-rgb), 0.4);

		display: flex;
		align-items: center;
		justify-content: space-around;

		@include mq(lg) {
			position: sticky;
			right: auto;
			bottom: auto;
			top: 0;
			height: 100vh;
			width: 12rem;

			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
		}

		a {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			flex: 1;

			@include mq(lg) {
				width: 100%;
				gap: 0.75rem;
				padding: 1.5rem 1.5rem;
				height: auto;
				flex: 0;

				justify-content: flex-start;
			}

			:global(svg) {
				transition: 0.2s ease;
			}

			&.active {
				color: var(--primary-700);

				:global(svg) {
					fill: var(--primary-700);
				}

				&::before {
					view-transition-name: navigation-active;
					position: absolute;
					content: '';
					width: 100%;
					height: 2px;
					top: 0;
					left: 0;
					right: 0;
					background: var(--primary-500);

					@include mq(md) {
						right: auto;
						bottom: 0;
						height: 100%;
						width: 2px;
					}
				}
			}

			.icon {
				width: 1.5rem;
				height: 1.5rem;
				flex: 0 0 auto;
			}

			span {
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				white-space: nowrap;
				border: 0;

				@include mq(lg) {
					position: relative;
					width: auto;
					height: auto;
					margin: 0;
					clip: auto;
					white-space: nowrap;
					overflow: visible;
				}
			}
		}
	}
</style>
