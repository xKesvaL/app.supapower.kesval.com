<script lang="ts">
	import { PAGES } from '$lib/ROUTES';
	import IconDiscountCheckFilled from '$lib/icons/IconDiscountCheckFilled.svelte';
	import IconStarFilled from '$lib/icons/IconStarFilled.svelte';
	import IconUsers from '$lib/icons/IconUsers.svelte';
</script>

<a href={PAGES._ROOT()}>
	<header>
		<h2>
			Savage
			<span>
				<span class="icon">
					<IconStarFilled />
				</span>
				4.69
			</span>
		</h2>
		<p>
			by KesvaL
			<span class="icon">
				<IconDiscountCheckFilled />
			</span>
		</p>
	</header>
	<div class="tags">
		<div class="tag">Intermediate</div>
		<div class="tag">5x/week</div>
	</div>
	<span>
		<div class="icon">
			<IconUsers />
		</div>
		69 atheltes tried it.
	</span>
</a>

<style lang="scss">
	a {
		padding: 0.5rem;
		background: radial-gradient(
				65.31% 70.71% at 50% 50%,
				hsl(var(--primary-500) / 0.1),
				hsl(var(--primary-300) / 0.1)
			),
			hsl(var(--primary-50) / 0.1);
		min-width: 13rem;
		flex: 1;
		border: 1px solid hsl(var(--base-500) / 0.25);
		border-radius: 0.5rem;
		transition: 0.3s;

		display: flex;
		flex-direction: column;

		gap: 0.5rem;

		&:hover {
			border-color: hsl(var(--base-500) / 0.5);
		}

		h2 {
			font-size: var(--fs-600);
			display: flex;

			span {
				display: flex;
				align-items: center;
				margin-left: auto;

				.icon {
					width: 16px;
					height: 16px;
				}
			}
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
				color: hsl(var(--primary-500));
			}
		}

		.tags {
			display: flex;
			font-size: var(--fs-200);
			gap: 0.5rem;
			font-weight: 300;

			.tag {
				padding: 0.125rem 0.25rem;
				background: linear-gradient(
						var(--wk-cc-tag-rotation),
						hsl(var(--secondary-300) / 0.2),
						hsl(var(--secondary-500) / 0.25)
					),
					linear-gradient(
						calc(var(--wk-cc-tag-rotation) * -1),
						hsl(var(--primary-300) / 0.2),
						hsl(var(--primary-500) / 0.25)
					),
					hsl(var(--secondary-100) / 0.1);
				border-radius: 0.25rem;

				&:first-child {
					--wk-cc-tag-rotation: 215deg;
				}

				&:last-child {
					--wk-cc-tag-rotation: 145deg;
				}
			}
		}

		span {
			font-size: var(--fs-200);
			font-weight: 300;
			display: flex;
			align-items: center;
			gap: 0.25rem;

			.icon {
				width: 20px;
				height: 20px;
				color: var(--base-950);
			}
		}
	}
</style>
