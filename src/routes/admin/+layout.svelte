<script lang="ts">
	import { goto } from '$app/navigation';
	import { PAGES } from '$lib/ROUTES';
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import { getContext } from 'svelte';

	const userData: UserDataStoreContext = getContext('userData');

	$: $userData.type !== 'admin' && goto(PAGES._ROOT());
</script>

{#if $userData.type === 'admin'}
	<slot />
{:else}
	<p>Not authorized</p>
{/if}
