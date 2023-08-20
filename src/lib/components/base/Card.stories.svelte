<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Card from './Card.svelte';
	import type { ArgTypes } from '@storybook/svelte';
	import type { ComponentProps } from 'svelte';

	type Story = ComponentProps<Card>;

	const metaArgs: Story = {
		vertical: true,
		color: 'primary',
		rounding: 'md',
		gap: 'md',
		scale: false,
		href: '',
		align: 'start',
		justify: 'center'
	};

	const argTypes: ArgTypes<Story> = {
		vertical: {
			control: 'boolean',
			type: 'boolean'
		},
		color: {
			type: 'string',
			control: 'select',
			options: ['primary', 'secondary']
		},
		rounding: {
			type: 'string',
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		gap: {
			type: 'string',
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		scale: {
			control: 'boolean',
			type: 'boolean'
		},
		href: {
			type: 'string',
			control: 'text'
		},
		align: {
			type: 'string',
			control: 'select',
			options: ['start', 'center', 'end']
		},
		justify: {
			type: 'string',
			control: 'select',
			options: ['start', 'center', 'end']
		}
	};
</script>

<Meta title="Components/Base/Card" component={Card} args={metaArgs} {argTypes} />

<Template args={metaArgs} {argTypes} let:args>
	<Card {...args} />
</Template>

<Story name="Vertical" let:args>
	<Card {...args}>
		<div>I am a card</div>
		<div>That is vertical</div>
		<div>Just like that</div>
	</Card>
</Story>

<Story name="Horizontal" let:args args={{ vertical: false }}>
	<Card {...args}>
		<div>I am a card</div>
		<div>That is horizontal</div>
		<div>Just like that</div>
	</Card>
</Story>
