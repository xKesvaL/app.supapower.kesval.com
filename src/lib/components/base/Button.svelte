<script lang="ts">
	import type { ThemeColor } from '$lib/typings/standard';

	export let color: ThemeColor = 'primary';
	export let href: string | null = null;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let style: 'solid' | 'outline' = 'solid';

	export let customButtonStyles: string = '';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="button {color} {style}"
	{type}
	{disabled}
	{href}
	style={customButtonStyles}
	on:click
	role="button"
	tabindex="0"
>
	{#if $$slots.before}
		<span>
			<slot name="before" />
		</span>
	{/if}
	<slot />
	{#if $$slots.after}
		<span>
			<slot name="after" />
		</span>
	{/if}
</svelte:element>

<style lang="scss">
	.button {
		gap: 0.25rem;

		&:disabled {
			filter: grayscale(0.9);
		}

		span {
			height: 24px;
			width: 24px;
		}
	}
</style>
