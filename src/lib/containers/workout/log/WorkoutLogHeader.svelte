<script lang="ts">
	import IconChevronDown from '$lib/icons/IconChevronDown.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;
</script>

<div class="wrapper">
	<header class="page-header">
		<div class="start">
			<a class="button icon" href={fRel}>
				<IconChevronDown />
			</a>
			<span>{$t('pages.workout.label')}</span>
		</div>
		<div></div>
		<div class="end">
			<button class="primary"> Finish </button>
		</div>
	</header>
	<progress value="50" max="100" class="primary"></progress>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		padding: 0;

		header {
			background: rgba(var(--base-200-rgb), 1);

			.start {
				.icon {
					width: 40px;
					height: 40px;
					padding: 8px;
					background: none;
				}

				gap: 0.5rem;
				font-size: var(--fs-500);
				font-weight: 600;
			}
		}

		progress {
			width: 100%;
			height: 0.25rem;
			border: none;
			border-radius: 0;
			max-width: 1280px;
			margin: 0 auto;
		}
	}
</style>
