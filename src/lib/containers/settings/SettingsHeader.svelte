<script lang="ts">
	import IconArrowLeft from '$lib/icons/IconArrowLeft.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;
	export let saveButton: boolean = true;
	export let saveButtonEnabled: boolean = false;
	export let loading: boolean = false;
	export let title = $t('pages.settings.label');

	import { createEventDispatcher } from 'svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { Button } from '$lib/components/ui/button';

	const dispatch = createEventDispatcher();

	const onSave = () => {
		dispatch('save');
	};
</script>

<header class="page-header">
	<div class="start">
		<Button
			size="icon"
			href={fRel}
			class="icon p-1 bg-transparent hover:bg-transparent text-foreground"
		>
			<IconArrowLeft />
		</Button>
	</div>
	<div class="center">{title}</div>
	<div class="end">
		{#if saveButton}
			<Button class="transition-all" on:click={onSave} disabled={!saveButtonEnabled}>
				{#if loading}
					<span class="loading" />
				{:else}
					{capitalizeFirstLetter($t('std.save'))}
				{/if}
			</Button>
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		@include mq(lg) {
			view-transition-name: settings-header;

			.start {
				opacity: 0;
				pointer-events: none;
			}
		}

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
	}
</style>
