<script>
	import IconHouse from '$lib/icons/IconHouse.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import IconUser from '$lib/icons/IconUser.svelte';
	import IconBarbell from '$lib/icons/IconBarbell.svelte';
</script>

<nav>
	<a href="/" class:active={$page.url.pathname === '/'}>
		<IconHouse />
		<span class="visually-hidden">{$t('pages.home.label')}</span>
	</a>
	<a href="/workout" class:active={$page.url.pathname.startsWith('/workout')}>
		<IconBarbell />
		<span class="visually-hidden">{$t('pages.workout.label')}</span>
	</a>
	<a href="/profile" class:active={$page.url.pathname.startsWith('/profile')}>
		<IconUser />
		<span class="visually-hidden">{$t('pages.profile.label')}</span>
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
		background: red;
		padding: 0.5rem 1rem;

		display: flex;
		align-items: center;
		justify-content: space-around;

		a {
			width: 28px;
			height: 28px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			&.active::before {
				view-transition-name: navigation-active;
				position: absolute;
				content: '';
				width: 20px;
				height: 20px;
				background: blue;
			}
		}
	}
</style>
