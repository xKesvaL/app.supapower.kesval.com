<script lang="ts">
	import Steps from '$lib/components/base/Steps.svelte';
	import type { Step } from '$lib/typings/steps';

	export let currentStep = 0;
	export let steps: Step[] = Array(3)
		.fill(0)
		.map((_, i) => {
			return { name: `flows.register.steps.${i}.label` };
		});
</script>

<Steps {steps} {currentStep} direction="horizontal" color="primary" />
