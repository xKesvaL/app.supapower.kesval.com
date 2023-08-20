<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Auth from './Auth.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Auth>;

	const metaArgs: Story = {
		type: 'login'
	};

	const argTypes: ArgTypes<Story> = {
		type: {
			type: 'string',
			control: 'select',
			options: ['login', 'register', 'reauth']
		}
	};
</script>

<Meta title="Containers/Auth/Base" component={Auth} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Auth {...args} />
</Template>

<Story name="Default" let:args>
	<Auth {...args} />
</Story>
