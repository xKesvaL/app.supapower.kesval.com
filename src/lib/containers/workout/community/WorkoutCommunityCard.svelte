<script lang="ts">
	import { ROUTES } from '$lib/config';
</script>

<a href={ROUTES.home}>Workout Card</a>

<style lang="scss">
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
</style>
