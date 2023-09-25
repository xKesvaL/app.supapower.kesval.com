<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ username } = data);
</script>

hi {username}
