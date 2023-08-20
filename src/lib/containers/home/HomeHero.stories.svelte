<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import HomeHero from './HomeHero.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<HomeHero>;

	const metaArgs: Story = {};

	const argTypes: ArgTypes<Story> = {};
</script>

<Meta title="Containers/Home/Hero" component={HomeHero} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<HomeHero {...args} />
</Template>

<Story name="Default" let:args>
	<HomeHero {...args} />
</Story>
