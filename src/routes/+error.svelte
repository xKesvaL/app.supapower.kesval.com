<script lang="ts">
	import { page } from '$app/stores';

	import ErrorHero from '$lib/containers/error/ErrorHero.svelte';
</script>

<ErrorHero status={$page.status} message={$page.error?.message} />
