<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	export let reps: number | null;
</script>

<Input bind:value={reps} type="number" class="text-center p-2 border border-border/50" />
