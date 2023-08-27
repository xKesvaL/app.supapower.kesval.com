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

<div class="wrapper">
	<Card customCardStyle="min-width: 22rem; min-height: 26rem;">
		{#if type === 'login'}
			<AuthLogin on:switchTo={switchTo} />
		{:else}
			<AuthRegister on:switchTo={switchTo} />
		{/if}
	</Card>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 100vh;

		background: radial-grad-primary(0.025), linear-grad-primary(135deg, 0.025),
			linear-grad-secondary(-45deg, 0.025);
	}
</style>
