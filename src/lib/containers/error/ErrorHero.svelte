<script lang="ts">
	export let status = 404;

	export let message = 'Page not found';
</script>

<section class="section container container-wide">
	<h1>{status} - {message}</h1>
</section>

<style lang="scss">
	section {
		background: radial-gradient(
			circle,
			rgba(var(--color-accent-500-rgb), 0.15) 0%,
			rgba(var(--color-base-100-rgb), 0) 60%
		);
		min-height: 100vh;
	}
</style>
