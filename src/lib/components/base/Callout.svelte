<script lang="ts">
	import IconAlertCircle from '$lib/icons/IconAlertCircle.svelte';
	import IconCircleCheck from '$lib/icons/IconCircleCheck.svelte';
	import IconInfoCircle from '$lib/icons/IconInfoCircle.svelte';

	export let type: 'info' | 'danger' | 'success' = 'info';
</script>

<div class="callout {type}">
	<div class="icon">
		{#if type == 'info'}
			<IconInfoCircle />
		{:else if type == 'success'}
			<IconCircleCheck />
		{:else if type == 'danger'}
			<IconAlertCircle />
		{/if}
	</div>
	<slot />
</div>

<style lang="scss">
	.callout {
		--clt-border-w: 4px;

		position: relative;
		padding: 1.5rem;
		border-radius: 0 1rem 1rem 0;

		&.success {
			background: rgba(var(--success-500-rgb), 0.5);
			border-left: var(--clt-border-w) solid var(--success-500);

			.icon {
				color: var(--success-500);
			}
		}

		&.info {
			background: rgba(var(--info-500-rgb), 0.5);
			border-left: var(--clt-border-w) solid var(--info-500);

			.icon {
				color: var(--info-500);
			}
		}

		&.danger {
			background: rgba(var(--danger-500-rgb), 0.5);
			border-left: var(--clt-border-w) solid var(--danger-500);

			.icon {
				color: var(--danger-500);
			}
		}

		.icon {
			position: absolute;
			top: 0;
			left: 0;
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--base-50);
			transform: translate(calc(-50% - (var(--clt-border-w) / 2)), -50%);
			padding: 0.5rem;
		}
	}
</style>
