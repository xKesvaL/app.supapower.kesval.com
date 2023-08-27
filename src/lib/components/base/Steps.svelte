<script lang="ts">
	import type { ThemeColor } from '$lib/typings/standard';
	import type { Step } from '$lib/typings/steps';
	import { t } from 'svelte-i18n';

	export let steps: Step[];
	export let currentStep = 0;
	export let direction:
		| 'horizontal'
		| 'vertical'
		| 'horizontalToVertical'
		| 'verticalToHorizontal' = 'horizontal';
	export let color: ThemeColor = 'primary';
</script>

<div class="steps {direction}" style="--color: rgba(var(--{color}-500-rgb), 1)">
	{#each steps as step, i}
		<div class="step {i <= currentStep ? 'active' : ''}">
			<div class="number">
				{i + 1}
			</div>
			<div class="label">
				{$t(step.name)}
			</div>
		</div>
		{#if i < steps.length - 1}
			<div class="line {i <= currentStep - 1 ? 'active' : ''}" />
		{/if}
	{/each}
</div>

<style lang="scss">
	.steps {
		--default-color: rgba(var(--base-500-rgb), 1);
		--color: rgba(var(--primary-500-rgb), 1);
		display: flex;
		align-items: center;

		.step {
			position: relative;
			width: 40px;
			height: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.number {
				border-radius: 50%;
				width: 40px;
				height: 40px;
				border: 2px solid var(--default-color);
				font-size: 1.2rem;
				font-weight: 900;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: 0.3s ease;
			}

			.label {
				position: absolute;
			}

			&.active {
				.number {
					border-color: var(--color);
					background-color: var(--color);
				}
			}
		}

		.line {
			flex: 1 0 auto;
			background: var(--default-color);
			transition: 0.3s ease;

			&.active {
				background: var(--color);
			}
		}

		@mixin horizontal {
			flex-direction: row;

			.step {
				.label {
					text-align: center;
					width: 200%;
					height: auto;
					top: calc(100% + 0.75rem);
					left: auto;

					@include mq(sm) {
						width: 300%;
					}

					@include mq(md) {
						width: 400%;
					}
				}
			}

			.line {
				height: 2px;
				width: auto;
				min-height: auto;
				min-width: 80px;

				@include mq(sm) {
					min-width: 120px;
				}

				@include mq(md) {
					min-width: 160px;
				}
			}
		}

		@mixin vertical {
			flex-direction: column;

			.step {
				.label {
					text-align: center;
					width: auto;
					height: 200%;
					top: auto;
					left: calc(100% + 0.75rem);
					display: flex;
					align-items: center;
					justify-content: center;

					@include mq(md) {
						height: 300%;
					}
				}
			}

			.line {
				width: 2px;
				height: auto;
				min-width: auto;
				min-height: 80px;

				@include mq(md) {
					min-height: 120px;
				}
			}
		}

		&.horizontal {
			@include horizontal;
		}

		&.vertical {
			@include vertical;
		}

		&.horizontalToVertical {
			@include horizontal;

			@include mq(lg) {
				@include vertical;
			}
		}

		&.verticalToHorizontal {
			@include vertical;

			@include mq(lg) {
				@include horizontal;
			}
		}
	}
</style>
