<script lang="ts">
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'primary';
	export let href: string | null = null;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let style: 'solid' | 'outline' = 'solid';
</script>

<svelte:element this={href ? 'a' : 'button'} class="button {color} {style}" {type} {disabled}>
	{#if $$slots.icon}
		<span>
			<slot name="icon" />
		</span>
	{/if}
	<slot />
</svelte:element>

<style lang="scss">
	.btn {
		gap: 0.5rem;

		span {
			height: 24px;
			width: 24px;
		}
	}
</style>
