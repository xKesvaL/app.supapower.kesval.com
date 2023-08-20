<script lang="ts">
	import AuthLogin from '$lib/components/auth/AuthLogin.svelte';
	import AuthReauth from '$lib/components/auth/AuthReauth.svelte';
	import AuthRegister from '$lib/components/auth/AuthRegister.svelte';
	import Card from '$lib/components/base/Card.svelte';
	import { fade } from 'svelte/transition';

	export let type: 'login' | 'register' | 'reauth' = 'login';
</script>

<Card scale={false}>
	<div class="wrapper" transition:fade={{ duration: 300, delay: 300 }}>
		{#if type === 'login'}
			<AuthLogin />
		{:else if type === 'register'}
			<AuthRegister />
		{:else if type === 'reauth'}
			<AuthReauth />
		{/if}
	</div>
</Card>
