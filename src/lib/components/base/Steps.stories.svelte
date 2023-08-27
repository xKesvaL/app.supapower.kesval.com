<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Steps from './Steps.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Steps>;

	const metaArgs: Story = {
		steps: [
			{
				name: 'Step 1'
			},
			{
				name: 'Step 2'
			},
			{
				name: 'Step 3'
			}
		],
		currentStep: 0,
		direction: 'horizontal',
		color: 'primary'
	};

	const argTypes: ArgTypes<Story> = {
		steps: {
			control: 'object'
		},
		currentStep: {
			control: {
				type: 'number',
				min: 0
			}
		},
		direction: {
			control: 'select',
			options: ['horizontal', 'vertical', 'horizontalToVertical', 'verticalToHorizontal']
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary']
		}
	};
</script>

<Meta title="Components/Base/Steps" component={Steps} args={metaArgs} {argTypes} />

<Template args={metaArgs} let:args>
	<Steps {...args} />
</Template>

<Story name="Default" let:args>
	<Steps {...args} />
</Story>
