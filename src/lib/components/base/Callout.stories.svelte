<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Callout from './Callout.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Callout>;

	const metaArgs: Story = {
		type: 'info'
	};

	const argTypes: ArgTypes<Story> = {
		type: {
			type: 'string',
			control: 'select',
			options: ['success', 'info', 'danger']
		}
	};
</script>

<Meta title="Components/Base/Callout" component={Callout} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Callout {...args} />
</Template>

<Story name="Default" let:args>
	<Callout {...args}>
		Hi I am a Callout. This is used to tell peolpe about something important or to get their
		attention, usually in a blog.
	</Callout>
</Story>
