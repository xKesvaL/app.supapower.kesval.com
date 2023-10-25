<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';

	export let done: boolean;
</script>

<Checkbox class="w-5 h-5 flex justify-center items-center mx-auto" bind:checked={done} />
