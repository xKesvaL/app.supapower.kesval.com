<script lang="ts">
	import IconArrowLeft from '$lib/icons/IconArrowLeft.svelte';
	import { t } from 'svelte-i18n';

	export let fRel: string;
</script>

<header class="page-header">
	<div class="start">
		<a href={fRel}>
			<IconArrowLeft />
		</a>
	</div>
	<div class="center">
		{$t('pages.admin.users.label')}
	</div>
	<div class="end"></div>
</header>

<style lang="scss">
	header {
		.start {
			a {
				width: 32px;
				height: 32px;
			}
		}
	}
</style>
