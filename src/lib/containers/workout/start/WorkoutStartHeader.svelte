<script lang="ts">
	import IconChevronDown from '$lib/icons/IconChevronDown.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;
</script>

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

<style lang="scss">
	header {
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
</style>
