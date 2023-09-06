<script lang="ts">
	import IconArrowLeft from '$lib/icons/IconArrowLeft.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;
</script>

<header>
	<div class="start">
		<a href={fRel} class="icon">
			<IconArrowLeft />
		</a>
	</div>
	<div class="center">{$t('pages.settings.label')}</div>
	<div class="end" />
</header>

<style lang="scss">
	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		padding: 0.75rem 1rem 0.75rem 0.5rem;
		gap: 0.5rem;

		div {
			display: flex;
			align-items: center;
		}

		.start {
			justify-content: start;
		}

		.center {
			justify-content: center;
		}

		.end {
			justify-content: end;
		}

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
		}
	}
</style>
