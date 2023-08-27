<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Loading from './Loading.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Loading>;

	const metaArgs: Story = {
		
	};

	const argTypes: ArgTypes<Story> = {};
</script>

<Meta title="Containers/Layout/Loading" component={Loading} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Loading {...args} />
</Template>

<Story name="Default" let:args>
	<Loading {...args} />
</Story>
