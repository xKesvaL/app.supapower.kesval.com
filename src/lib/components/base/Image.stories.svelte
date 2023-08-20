<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import type { ComponentProps } from 'svelte';
	import Image from './Image.svelte';
	import type { ArgTypes } from '@storybook/svelte';

	type Story = ComponentProps<Image>;

	const metaArgs: Story = {
		src: '',
		alt: 'Alt Text',
		figcaption: 'Figcaption Text',
		loading: 'lazy',
		rounding: 'md'
	};

	const argTypes: ArgTypes<Story> = {
		src: {
			type: 'string',
			control: 'text'
		},
		alt: {
			type: 'string',
			control: 'text'
		},
		figcaption: {
			type: 'string',
			control: 'text'
		},
		loading: {
			type: 'string',
			control: 'select',
			options: ['lazy', 'eager']
		},
		rounding: {
			type: 'string',
			control: 'select',
			options: ['sm', 'md', 'lg', 'full']
		}
	};
</script>

<Meta title="Components/Base/Image" component={Image} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Image {...args} />
</Template>

<Story
	name="Valid Source"
	let:args
	args={{
		src: 'https://via.placeholder.com/150'
	}}
>
	<Image {...args} />
</Story>

<Story
	name="Invalid Source"
	let:args
	args={{
		src: './invalid.png'
	}}
>
	<Image {...args} />
</Story>
