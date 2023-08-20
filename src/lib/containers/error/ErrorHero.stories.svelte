<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import ErrorHero from './ErrorHero.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<ErrorHero>;

	const metaArgs: Story = {};

	const argTypes: ArgTypes<Story> = {};
</script>

<Meta title="Containers/Error/Hero" component={ErrorHero} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<ErrorHero {...args} />
</Template>

<Story name="Default" let:args>
	<ErrorHero {...args} />
</Story>
