<script lang="ts">
	import { PAGES } from '$lib/ROUTES';
	import { Button } from '$lib/components/ui/button';
	import IconArrowLeft from '$lib/icons/IconArrowLeft.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;

	$: fRel = fRel == PAGES._ROOT() ? PAGES.profile() : fRel;
</script>

<header class="page-header">
	<div class="start">
		<Button href={fRel} size="icon" class="p-1 bg-transparent hover:bg-transparent text-foreground">
			<IconArrowLeft />
		</Button>
	</div>
	<div class="center">{$t('pages.settings.label')}</div>
	<div class="end" />
</header>

<style lang="scss">
	header {
		@include mq(lg) {
			view-transition-name: settings-list-header;

			.start {
				display: flex;
			}
		}

		div {
			display: flex;
			align-items: center;
		}

		.start {
			justify-content: start;
			gap: 0.5rem;
		}

		.center {
			justify-content: center;
		}

		.end {
			justify-content: end;
		}
	}
</style>
