<script lang="ts">
	import IconPhotoOff from '$lib/icons/IconPhotoOff.svelte';
	import type { ThemeSize } from '$lib/types';
	import { Image } from '@kesval/image-svelte';

	export let src: string;
	export let alt: string;

	export let loading: 'lazy' | 'eager' = 'lazy';
	export let figcaption: string;
	export let rounding: ThemeSize | 'full' = 'md';

	let error = false;
</script>

<Image {src} {alt} let:srcSet>
	{#if error}
		<div class="invalid-source rounding-{rounding}">
			<div class="icon">
				<IconPhotoOff />
			</div>
		</div>
		{#if figcaption}
			<p class="caption">{figcaption}</p>
		{/if}
	{:else}
		<figure>
			<img
				class="rounding-{rounding}"
				{src}
				{alt}
				srcset={srcSet}
				{loading}
				on:error={() => {
					error = true;
				}}
				decoding="async"
			/>
			{#if figcaption}
				<figcaption>{figcaption}</figcaption>
			{/if}
		</figure>
	{/if}
</Image>

<style lang="scss">
	figure img,
	.invalid-source {
		&.rounding-sm {
			border-radius: 0.25rem;
		}

		&.rounding-md {
			border-radius: 0.5rem;
		}

		&.rounding-lg {
			border-radius: 1rem;
		}

		&.rounding-full {
			border-radius: 9999px;
		}
	}

	figure figcaption,
	.caption {
		text-align: center;
		margin-top: var(--size-1);
		font-size: var(--fs-300);
		font-style: italic;
		color: var(--base-800);
		letter-spacing: 0.025em;
	}

	figure {
		width: 100%;
		height: 100%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.invalid-source {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		aspect-ratio: 1;
		width: 100%;
		background-color: var(--base-100);
		color: var(--base-800);

		.icon {
			height: 3rem;
			width: 3rem;
		}
	}
</style>
