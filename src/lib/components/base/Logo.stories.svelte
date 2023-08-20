<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Logo from './Logo.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Logo>;

	const metaArgs: Story = {
		animated: true,
		repeat: true,
		scaleOrigin: 'center',
		size: 'large'
	};

	const argTypes: ArgTypes<Story> = {
		animated: {
			type: 'boolean',
			control: 'boolean'
		},
		repeat: {
			type: 'boolean',
			control: 'boolean'
		},
		scaleOrigin: {
			type: 'string',
			control: 'select',
			options: ['center', 'left']
		},
		size: {
			type: 'string',
			control: 'select',
			options: ['normal', 'semi-large', 'large']
		}
	};
</script>

<Meta title="Components/Base/Logo" component={Logo} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Logo {...args} />
</Template>

<Story name="Default" let:args>
	<Logo {...args} />
</Story>
