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

	const dispatch = createEventDispatcher();

	const onSave = () => {
		dispatch('save');
	};
</script>

<header class="page-header">
	<div class="start">
		<a href={fRel} class="icon">
			<IconArrowLeft />
		</a>
	</div>
	<div class="center">{title}</div>
	<div class="end">
		{#if saveButton}
			<button class="primary" on:click={onSave} disabled={!saveButtonEnabled}>
				{#if loading}
					<span class="loading" />
				{:else}
					{capitalizeFirstLetter($t('std.save'))}
				{/if}
			</button>
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

			button {
				padding: 0.4rem 1rem;
				transition: 0.2s ease;
				color: var(--primary-950);
				height: auto;
				width: auto;

				&:disabled {
					opacity: 0.3;
				}
			}
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
