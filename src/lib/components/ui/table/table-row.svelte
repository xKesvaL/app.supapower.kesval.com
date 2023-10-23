<script lang="ts">
	import { cn } from '$lib/utils/ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tr
	class={cn(
		'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
		className
	)}
	{...$$restProps}
	transition:fly={{ y: -20, duration: 150, opacity: 0 }}
>
	<slot />
</tr>
