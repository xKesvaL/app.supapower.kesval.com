<script lang="ts">
	import IconChevronRight from '$lib/icons/IconChevronRight.svelte';
	import IconUserCircle from '$lib/icons/IconUserCircle.svelte';

	const suffix = '?frel=/settings';
</script>

<section>
	<nav>
		<div>
			<h2>votre compte</h2>
			<a href="/settings/profile{suffix}">
				<div class="icon">
					<IconUserCircle />
				</div>
				lien profil
				<span class="icon">
					<IconChevronRight />
				</span>
			</a>
			<a href="/settings/profile{suffix}">
				<div class="icon">
					<IconUserCircle />
				</div>
				lien profil
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
		</div>

		<div>
			<h2>votre compte</h2>
			<a href="/settings/profile{suffix}">
				<div class="icon">
					<IconUserCircle />
				</div>
				lien profil
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
			<a href="/settings/profile{suffix}">
				<div class="icon">
					<IconUserCircle />
				</div>
				lien profil
				<span class="icon">
					<IconChevronRight />
				</span></a
			>
		</div>
	</nav>
</section>

<style lang="scss">
	section {
		view-transition-name: settings-list;

		:root::view-transition-old(settings-list) {
			animation: 100ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
		}

		:root::view-transition-new(settings-list) {
			animation: 100ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
		}

		nav {
			display: grid;
			gap: 0.75rem;

			& > div {
				background: rgba(var(--base-200-rgb), 0.3);
				padding: 0 1rem;

				h2 {
					font-size: var(--fs-200);
					color: rgba(var(--base-900-rgb), 0.7);
					font-family: var(--ft-sans);
					font-weight: 300;
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
					gap: 0.5rem;

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
