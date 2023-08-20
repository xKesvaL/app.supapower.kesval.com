<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Navigation from './Navigation.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Navigation>;

	const metaArgs: Story = {};

	const argTypes: ArgTypes<Story> = {};
</script>

<Meta title="Components/Layout/Navigation" component={Navigation} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Navigation {...args} />
</Template>

<Story name="Default" let:args>
	<Navigation {...args} />
</Story>
