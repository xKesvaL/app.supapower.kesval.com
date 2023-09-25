<script lang="ts">
	import AdminUsersList from '$lib/containers/admin/AdminUsersList.svelte';
	import AdminUsersListHeader from '$lib/containers/admin/AdminUsersListHeader.svelte';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;

	$: ({ fRel } = data);
</script>

<AdminUsersListHeader {fRel} />
<AdminUsersList />
