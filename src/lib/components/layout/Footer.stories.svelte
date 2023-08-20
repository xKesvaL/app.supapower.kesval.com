<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Footer from './Footer.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Footer>;

	const metaArgs: Story = {};

	const argTypes: ArgTypes<Story> = {};
</script>

<Meta title="Components/Layout/Footer" component={Footer} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Footer {...args} />
</Template>

<Story name="Default" let:args>
	<Footer {...args} />
</Story>
