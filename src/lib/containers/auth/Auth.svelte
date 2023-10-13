<script lang="ts">
	import type { AuthType } from '$lib/firebase/auth/types';

	import AuthLogin from '$lib/components/auth/AuthLogin.svelte';
	import AuthRegister from '$lib/components/auth/AuthRegister.svelte';

	import Card from '$lib/components/base/Card.svelte';

	let type: AuthType = 'login';

	const switchTo = () => {
		type = type === 'login' ? 'register' : 'login';
	};
</script>

<div class="wrapper flex items-center justify-center w-full min-h-screen">
	<Card customCardStyle="min-width: 22rem; min-height: 26rem;" colorOpacity={0.1}>
		{#if type === 'login'}
			<AuthLogin on:switchTo={switchTo} />
		{:else}
			<AuthRegister on:switchTo={switchTo} />
		{/if}
	</Card>
</div>

<style lang="scss">
	.wrapper {
		background: radial-gradient(circle at 28% 37%, hsl(var(--primary-300) / 0.25), transparent 50%),
			radial-gradient(circle at 70% 66%, hsl(var(--secondary-300) / 0.25), transparent 50%);
	}
</style>
