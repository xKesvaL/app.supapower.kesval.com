<script lang="ts">
	import { overlayShown, overlayStrength } from '$lib/stores/overlay';
	import { blur } from 'svelte/transition';
</script>

<button
	class="overlay"
	transition:blur={{ amount: 5, duration: 300 }}
	style="--ov-str: {$overlayStrength}"
	on:click={() => overlayShown.set(false)}
/>

<style lang="scss">
	.overlay {
		view-transition-name: overlay;
		position: fixed;
		inset: 0;
		z-index: 1000;
		height: auto;

		background: hsl(var(--base-100) / var(--ov-str, 0.8)) !important;
		backdrop-filter: blur(5px);
	}
</style>
