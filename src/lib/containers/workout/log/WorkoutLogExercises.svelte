<script lang="ts">
	import type { WorkoutStoreContext } from '$lib/firebase/workout/types';
	import IconDotsVertical from '$lib/icons/IconDotsVertical.svelte';
	import { getContext } from 'svelte';

	const currentWorkout: WorkoutStoreContext = getContext('currentWorkout');
</script>

<section class="container">
	{#each $currentWorkout.exercises as exercise}
		<div class="exercise">
			<header>
				<div class="image">img</div>
				<h2>{exercise.exerciseName}</h2>
				<a href="/" class="more">
					<IconDotsVertical />
				</a>
			</header>
		</div>
	{/each}
</section>

<style lang="scss">
	section.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.exercise {
			header {
				display: flex;
				align-items: center;
				gap: 0.75rem;

				.image {
					width: 3rem;
					height: 3rem;
					background: var(--base-950);
					border-radius: 9999px;
					overflow: hidden;
				}

				h2 {
					font-size: var(--fs-500);
					font-weight: 700;
				}

				.more {
					margin-left: auto;
					color: var(--secondary-500);
				}
			}
		}
	}
</style>
