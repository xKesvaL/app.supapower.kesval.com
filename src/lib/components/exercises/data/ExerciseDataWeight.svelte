<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	export let weight: number | null;
</script>

<Input bind:value={weight} type="number" class="text-center p-2 border border-border/50" />
