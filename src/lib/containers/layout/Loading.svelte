<script lang="ts">
	import Logo from '$lib/components/base/Logo.svelte';

	export let size: number = 0.9;
</script>

<section>
	<Logo {size} repeat={true} />
</section>

<style lang="scss">
	section {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
