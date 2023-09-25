<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/config';
	import type { UserDataStoreContext } from '$lib/firebase/user/types';
	import { getContext } from 'svelte';

	const userData: UserDataStoreContext = getContext('userData');

	$: $userData.type !== 'admin' && goto(ROUTES.home);
</script>

{#if $userData.type === 'admin'}
	<slot />
{:else}
	<p>Not authorized</p>
{/if}
