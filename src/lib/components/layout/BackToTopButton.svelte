<script lang="ts">
	import { browser } from '$app/environment';
	import { afterUpdate } from 'svelte';
	import { fly } from 'svelte/transition';

	import { t } from 'svelte-i18n';
	import IconArrowTop from '$lib/icons/IconArrowTop.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/functions';

	export let dev = false;
	let scrollY: number;
	let previousScrollY: number;
	export let scrollPercentage: number = 0;
	export let scrollingUp = false;
	let innerHeight: number;
	let scrollHeight: number;
	let scrollThresholdStep: number;
	let pageEndTopBound: number;
	const topPercentage = 0.025;
	const bottomPercentage = 0.975;

	$: scrollThresholdStep = innerHeight * 0.1;
	$: if (browser) {
		scrollPercentage = scrollY / pageEndTopBound;
		pageEndTopBound = scrollHeight - innerHeight;
		if (Math.abs(previousScrollY - scrollY) > scrollThresholdStep) {
			scrollingUp = previousScrollY - scrollY > 0;
			previousScrollY = scrollY;
		}
	}

	afterUpdate(() => {
		scrollHeight = document.documentElement.scrollHeight;
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if (scrollPercentage > topPercentage && scrollPercentage < bottomPercentage) || dev}
	<button
		on:click={() => {
			scrollY = scrollingUp ? 0 : scrollHeight;
		}}
		class:dev
		id="back-to-top"
		aria-label="{capitalizeFirstLetter($t('std.scrollTo'))} {scrollingUp
			? $t('std.top')
			: $t('std.bottom')}"
		in:fly={{ y: 50, duration: 300, delay: 300 }}
		out:fly={{ y: 50, duration: 300 }}
	>
		<div class="inner">
			<div class="arrow {scrollingUp ? '' : 'down'}">
				<IconArrowTop />
			</div>

			<svg height="100" width="100" style="transform: rotate(-90deg);stroke-dasharray: 251;">
				<circle
					cx="50"
					cy="50"
					r="40"
					stroke-width="6"
					stroke="var(--color-primary-500)"
					style="stroke-dashoffset: {251 - 251 * scrollPercentage};"
				/>
			</svg>
		</div>
	</button>
{/if}

<style lang="scss">
	button {
		position: fixed;
		display: grid;
		bottom: 0;
		right: 0;
		z-index: 5;
		border-radius: 9999px;
		background: transparent;

		&.dev {
			position: relative;
		}

		.inner {
			backdrop-filter: blur(0.5rem);
			border-radius: 9999px;
			grid-column-start: 1;
			grid-row-start: 1;
			transition: 0.3s ease-in-out;
			scale: 0.6;
			position: relative;
			background: var(--base-200);

			.arrow {
				position: absolute;
				top: 1.45rem;
				left: 1.45rem;
				z-index: 50;
				height: 3.5rem;
				width: 3.5rem;
				color: var(--base-900);
				transition: 0.3s ease-in-out;

				&.down {
					transform: rotateX(180deg);
				}
			}

			svg {
				fill: var(--base-200);
				fill-opacity: 1;
				transition: 0.3s ease-in-out;
			}
		}

		&:hover {
			.inner {
				svg {
					fill-opacity: 0.2;
				}
			}
		}
	}
</style>
