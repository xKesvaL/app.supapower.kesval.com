<script lang="ts">
	import type { ThemeColor, ThemeSize } from '$lib/typings/standard';
	import type { MouseEventHandler } from 'svelte/elements';

	export let href: string | undefined = undefined;
	export let scale = false;
	export let color: ThemeColor = 'primary';
	export let colorOpacity = 0.3;
	export let rounding: ThemeSize = 'md';
	export let vertical = true;
	export let justify: 'start' | 'center' | 'end' = 'center';
	export let align: 'start' | 'center' | 'end' = 'start';
	export let gap: ThemeSize = 'md';
	export let maxWidth = true;

	export let customCardStyle = '';
	export let customCardBgStyle = '';

	let el: HTMLElement;

	$: el?.style.setProperty('--card-drop-color', `hsl(var(--${color}-300) / ${colorOpacity})`);
	$: el?.style.setProperty('--card-hover-color', `hsl(var(--base-200) / ${colorOpacity})`);

	const onHover: MouseEventHandler<HTMLElement> = (ev) => {
		const target = ev.currentTarget;
		const rect = target.getBoundingClientRect();

		const x = ev.clientX - rect.left;
		const y = ev.clientY - rect.top;

		target.style.setProperty('--card-drop-x', `${x}px`);
		target.style.setProperty('--card-drop-y', `${y}px`);
	};
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	bind:this={el}
	on:mousemove={onHover}
	class="card rounding-{rounding}"
	class:scale
	class:maxWidth
	style={customCardStyle}
	role={href ? 'link' : 'alert'}
>
	<div
		class="card-bg-img justify-{justify} align-{align} gap-{gap}"
		style={customCardBgStyle}
		class:horizontal={!vertical}
	>
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.card {
		--card-drop-x: 0;
		--card-drop-y: 0;

		--card-drop-color: hsl(var(--primary-300) / 0.3);
		--card-hover-color: hsl(var(--base-200) / 0.3);

		display: inline-flex;
		flex-direction: column;
		transition: 0.2s;
		padding: 0;
		box-shadow:
			0 0 1rem hsl(var(--primary-900) / 0.05),
			0 0.25rem 0.5rem hsl(var(--primary-900) / 0.05);

		background: hsl(var(--base-100) / 1);
		border: 1px solid hsl(var(--base-400));

		&.maxWidth {
			max-width: none;
		}

		&.rounding-sm {
			border-radius: 0.25rem;
		}

		&.rounding-md {
			border-radius: 0.5rem;
		}

		&.rounding-lg {
			border-radius: 1rem;
		}

		&:hover {
			&.scale {
				transform: scale(1.02);
			}

			border-color: hsl(var(--base-900) / 0.7);
		}

		&-bg-img {
			padding: 1.5rem;
			transition: 0.2s;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			flex: 1;

			&.justify {
				&-start {
					justify-content: flex-start;
				}

				&-center {
					justify-content: center;
				}

				&-end {
					justify-content: flex-end;
				}
			}

			&.align {
				&-start {
					align-items: flex-start;
				}

				&-center {
					align-items: center;
				}

				&-end {
					align-items: flex-end;
				}
			}

			&.gap {
				&-sm {
					gap: 0.5rem;
				}

				&-md {
					gap: 1rem;
				}

				&-lg {
					gap: 1.5rem;
				}
			}

			&.horizontal {
				flex-direction: row;
			}

			&:hover {
				background-color: var(--card-hover-color);
				background-image: radial-gradient(
					circle at var(--card-drop-x) var(--card-drop-y),
					var(--card-drop-color),
					transparent
				);
			}
		}
	}
</style>
