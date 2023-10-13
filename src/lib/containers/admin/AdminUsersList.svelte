<script lang="ts">
	import { firestore } from '$lib/firebase/config';

	import { collection } from 'firebase/firestore';
	import { createCollectionStore } from 'firebase-svelte';
	import type { Readable } from 'svelte/store';
	import { userTypes, type UserData, type UserType } from '$lib/firebase/user/types';
	import IconInfoCircle from '$lib/icons/IconInfoCircle.svelte';
	import { ROUTES } from '$lib/config';
	import autoAnimate from '@formkit/auto-animate';
	import { updateUserDataType } from '$lib/firebase/user/actions';
	import { overlayShown, overlayStrength } from '$lib/stores/overlay';
	import { t } from 'svelte-i18n';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { Button } from '$lib/components/ui/button';

	const usersStore: Readable<UserData[] | null | undefined> = createCollectionStore(
		firestore,
		collection(firestore, 'users')
	);

	let search = '';

	$: users = $usersStore?.filter((user) => user.username.includes(search));
	$: $overlayShown === false && (currentShownUser = null);

	let currentShownUser: string | null = null;

	const showTypeList = (username: string) => {
		currentShownUser = username;
		overlayStrength.set(0.5);
		overlayShown.set(true);
	};

	const setUserType = (uid: string, type: UserType) => {
		updateUserDataType(uid, type);
		overlayShown.set(false);
		currentShownUser = null;
	};
</script>

<section class="container" use:autoAnimate>
	<input bind:value={search} type="text" placeholder="search" class="primary" />
	{#if $usersStore}
		{#if users && users.length > 0}
			<div class="user-list" use:autoAnimate>
				{#each users as user (user.uid)}
					<div>
						<span>
							{user.username}
						</span>
						<div class="type">
							<Button on:click={() => showTypeList(user.username)}>
								{capitalizeFirstLetter($t(`std.user.type.${user.type}`))}
							</Button>
							<div
								class="type-list {currentShownUser === user.username ? 'show' : ''}"
								style="--type-list-h: {userTypes.indexOf(user.type) * 3}rem"
							>
								{#each userTypes as type (type)}
									<Button on:click={() => setUserType(user.uid, type)}>
										{capitalizeFirstLetter($t(`std.user.type.${type}`))}
									</Button>
								{/each}
							</div>
						</div>
						<Button
							href="{ROUTES.adminUsersUsername.replace(
								'{username}',
								user.username
							)}?frel={ROUTES.adminUsers}"
							size="icon"
							class="p-2 bg-transparent hover:bg-transparent"
						>
							<IconInfoCircle />
						</Button>
					</div>
				{/each}
			</div>
		{:else}
			<p>no users found</p>
		{/if}
	{:else if $usersStore === undefined}
		<span class="loading" />
	{:else}
		no users
	{/if}
</section>

<style lang="scss">
	section.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.user-list {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			div {
				display: flex;
				align-items: center;
				padding: 0.5rem 0.5rem 0.5rem 1rem;
				border-radius: 0.5rem;
				background: radial-gradient(
						65.31% 70.71% at 50% 50%,
						hsl(var(--primary-500) / 0.05),
						hsl(var(--primary-300) / 0.05)
					),
					hsl(var(--primary-50));

				.type {
					margin-left: auto;
					position: relative;

					.type-list {
						position: absolute;
						display: grid;
						grid-template-columns: 1fr;
						gap: 0.5rem;
						right: 0;
						top: 0;

						transition: transform 0.3s ease;
						transform: translateY(calc(var(--type-list-h) * -1));

						opacity: 0;
						pointer-events: none;
						transition: opacity 0.2s ease-in-out;

						z-index: 10000;

						&.show {
							opacity: 1;
							pointer-events: all;
						}
					}
				}
			}
		}
	}
</style>
