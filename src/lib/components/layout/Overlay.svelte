<script>
	import { overlayStrength } from '$lib/stores/overlay';
	import { blur } from 'svelte/transition';
</script>

<div
	class="overlay"
	transition:blur={{ amount: 5, duration: 300 }}
	style="--ov-str: {$overlayStrength}"
/>

<style lang="scss">
	.overlay {
		view-transition-name: overlay;
		position: fixed;
		inset: 0;
		z-index: 1000;

		background: rgba(var(--base-100-rgb), var(--ov-str, 0.8));
		backdrop-filter: blur(5px);
	}
</style>
