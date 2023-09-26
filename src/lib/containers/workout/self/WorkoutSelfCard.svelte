<script lang="ts">
	import { ROUTES } from '$lib/config';
	import IconDiscountCheckFilled from '$lib/icons/IconDiscountCheckFilled.svelte';
</script>

<a href={ROUTES.home}>
	<header>
		<h2>Savage</h2>
		<p>
			by You
			<span class="icon">
				<IconDiscountCheckFilled />
			</span>
		</p>
	</header>
</a>

<style lang="scss">
	a {
		padding: 0.5rem;
		background: radial-gradient(
				65.31% 70.71% at 50% 50%,
				rgba(var(--secondary-500-rgb), 0.1),
				rgba(var(--secondary-300-rgb), 0.1)
			),
			var(--secondary-50);
		min-width: 8rem;
		flex: 1;
		border: 1px solid rgba(var(--base-500-rgb), 0.25);
		border-radius: 0.5rem;
		transition: 0.3s;

		display: flex;
		flex-direction: column;

		gap: 0.5rem;

		&:hover {
			border-color: rgba(var(--base-500-rgb), 0.5);
		}

		h2 {
			font-size: var(--fs-600);
		}

		p {
			font-size: var(--fs-200);
			display: flex;
			align-items: center;
			gap: 0.25rem;

			.icon {
				display: flex;
				width: 12px;
				height: 12px;
				align-items: center;
				color: var(--primary-500);
			}
		}
	}
</style>
