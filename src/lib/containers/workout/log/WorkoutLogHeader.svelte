<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import IconChevronDown from '$lib/icons/IconChevronDown.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;
</script>

<div class="wrapper">
	<header class="page-header">
		<div class="start">
			<Button
				size="icon"
				class="p-2 bg-transparent hover:bg-transparent text-foreground"
				href={fRel}
			>
				<IconChevronDown />
			</Button>
			<span>{$t('pages.workout.label')}</span>
		</div>
		<div></div>
		<div class="end">
			<Button>Finish</Button>
		</div>
	</header>
	<div class="w-full h-1 bg-muted">
		<div class="h-full bg-primary" style="width: 50%;"></div>
	</div>
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
		z-index: 20;

		header {
			background: hsl(var(--base-100));
		}
	}
</style>
