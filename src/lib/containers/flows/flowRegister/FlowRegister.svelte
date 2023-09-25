<script lang="ts">
	import type { Locale } from '$lib/typings/standard';
	import { locale, t } from 'svelte-i18n';

	import type { FormEventHandler } from 'svelte/elements';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	import Button from '$lib/components/base/Button.svelte';
	import Card from '$lib/components/base/Card.svelte';

	import FlowRegisterSteps from './FlowRegisterSteps.svelte';

	import autoAnimate from '@formkit/auto-animate';
	import IconCheck from '$lib/icons/IconCheck.svelte';
	import IconX from '$lib/icons/IconX.svelte';

	import Image from '$lib/components/base/Image.svelte';

	import { isUsernameUnique, createUserData } from '$lib/firebase/user/actions';
	import type { UserDataWorkout, WorkoutType } from '$lib/firebase/user/types';

	import type { User } from 'firebase/auth';
	import { capitalizeFirstLetter } from '$lib/utils/functions';

	const user = getContext<Readable<User>>('user');

	let steps = [
		{ name: 'flows.register.steps.0.label' },
		{ name: 'flows.register.steps.1.label' },
		{ name: 'flows.register.steps.2.label' }
	];
	let currentStep = 0;

	const nextStep = async () => {
		if (currentStep === steps.length - 1) {
			createUserData({
				uid: $user.uid,
				username: username.value.toLowerCase(),
				workout: workout,
				lang: ($locale || 'en') as Locale
			});
			return;
		} else {
			currentStep++;
		}
	};

	const previousStep = async () => {
		currentStep--;
	};

	//
	// ─── USERNAME ───────────────────────────────────────
	//

	let canGoNext = false;
	const username: {
		value: string;
		unique: boolean;
		loading: boolean;
		error: string | null;
	} = {
		value: '',
		unique: false,
		loading: false,
		error: null
	};
	let userTimer: NodeJS.Timeout;

	const checkUsername: FormEventHandler<HTMLInputElement> = async () => {
		// Reset everything
		clearTimeout(userTimer);
		canGoNext = false;
		username.unique = false;
		username.loading = true;
		username.error = null;

		// Username too short

		if (!username.value || username.value.length <= 3)
			return (
				(username.loading = false),
				(username.error = 'flows.register.steps.0.inputs.username.error.short')
			);

		// Check if username is unique
		userTimer = setTimeout(async () => {
			if (await isUsernameUnique(username.value.toLowerCase())) {
				canGoNext = true;
				username.unique = true;
				username.loading = false;
				return;
			} else {
				canGoNext = false;
				username.unique = false;
				username.loading = false;
				username.error = 'flows.register.steps.0.inputs.username.error.taken';
				return;
			}
		}, 750);

		return;
	};

	const workout: UserDataWorkout = {
		type: 'powerbuilding',
		frequency: 4
	};

	//
	// ─── WORKOUT TYPE ───────────────────────────────────────
	//

	const switchToWorkoutType = (e: MouseEvent) => {
		const target = e.currentTarget as HTMLButtonElement;
		console.log(target);
		workout.type = target.dataset.workoutType as WorkoutType;
	};

	//
	// ─── WORKOUT FREQUENCY ───────────────────────────────────────
	//
</script>

<section class="container">
	<div class="steps">
		<FlowRegisterSteps {currentStep} {steps} />
	</div>
	<div class="custom-card">
		<Card customCardStyle="width: 100%;">
			<div class="wrapper" use:autoAnimate={{ duration: 150 }}>
				{#key currentStep}
					<header>
						<h1>{$t(steps[currentStep]?.name || '')}</h1>
					</header>
					<form on:submit|preventDefault={nextStep}>
						{#if currentStep === 0}
							<label>
								<span>{$t('flows.register.steps.0.inputs.username.label')}</span>
								<div class="input-w-icon">
									<input
										type="text"
										placeholder={$t('flows.register.steps.0.inputs.username.placeholder')}
										name="username"
										autocomplete="username"
										required
										bind:value={username.value}
										on:input={checkUsername}
									/>
									{#if username.loading}
										<div class="icon">
											<span class="loading" />
										</div>
									{:else if username.unique}
										<div class="icon check">
											<IconCheck />
										</div>
									{:else}
										<div class="icon x">
											<IconX />
										</div>
									{/if}
								</div>
								{#if !username.unique && !username.loading && username.error === ''}
									<span class="error">
										{$t('flows.register.steps.0.inputs.username.error.taken')}
									</span>
								{:else if username.error}
									<span class="error">{$t(username.error)}</span>
								{/if}
							</label>
						{:else if currentStep === 1}
							<div class="workoutTypes">
								<button
									class:active={workout.type === 'bodybuilding'}
									on:click={switchToWorkoutType}
									data-workout-type="bodybuilding"
									type="button"
								>
									<span> {$t('workouts.types.bodybuilding.name')} </span>
									<div class="img">
										<Image
											src="/images/flows/register/bodybuilding.png"
											alt={$t('workouts.types.bodybuilding.name')}
											objectFit="contain"
										/>
									</div>
								</button>
								<button
									class:active={workout.type === 'powerbuilding'}
									on:click={switchToWorkoutType}
									data-workout-type="powerbuilding"
									type="button"
								>
									<span> {$t('workouts.types.powerbuilding.name')} </span>
									<div class="img">
										<Image
											src="/images/flows/register/powerbuilding.png"
											alt={$t('workouts.types.powerbuilding.name')}
											objectFit="contain"
										/>
									</div>
								</button>
								<button
									class:active={workout.type === 'powerlifting'}
									on:click={switchToWorkoutType}
									data-workout-type="powerlifting"
									type="button"
								>
									<span> {$t('workouts.types.powerlifting.name')} </span>
									<div class="img">
										<Image
											src="/images/flows/register/powerlifting.png"
											alt={$t('workouts.types.powerlifting.name')}
											objectFit="contain"
										/>
									</div>
								</button>
							</div>
						{:else if currentStep === 2}
							<input
								type="range"
								name="frequency"
								min="2"
								max="6"
								class="primary"
								bind:value={workout.frequency}
							/>
							<div class="frequencies">
								<span>2 {$t('std.days')}</span>
								<span>3 {$t('std.days')}</span>
								<span>4 {$t('std.days')}</span>
								<span>5 {$t('std.days')}</span>
								<span>6 {$t('std.days')}</span>
							</div>
						{/if}
					</form>
				{/key}
				<footer>
					<Button color="secondary" disabled={currentStep === 0} on:click={previousStep}>
						<span>{capitalizeFirstLetter($t('std.previous'))}</span>
					</Button>
					<Button
						color={steps.length - 1 === currentStep ? 'success' : 'primary'}
						disabled={!canGoNext}
						on:click={nextStep}
					>
						<span>
							{steps.length - 1 === currentStep
								? capitalizeFirstLetter($t('std.finish'))
								: capitalizeFirstLetter($t('std.next'))}
						</span>
					</Button>
				</footer>
			</div>
		</Card>
	</div>
</section>

<style lang="scss">
	section {
		--ct-padding: 1rem;
		--ct-max-width: 600px;
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		.steps {
			padding: 2rem 1rem;
		}

		.custom-card {
			width: 100%;
			margin-top: 4rem;

			.wrapper {
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 0.75rem;

				header {
					h1 {
						font-size: var(--fs-700);
						margin-block: 0;
					}
				}

				form {
					min-height: auto;
					padding: 1rem 0;

					.workoutTypes {
						display: flex;
						flex-wrap: wrap;
						gap: 0.75rem;

						button {
							height: auto;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: space-between;
							min-width: 130px;
							max-height: 160px;
							border: 3px solid transparent;
							border-radius: 0.5rem;
							flex: 1;
							gap: 1rem;
							background: radial-gradient(
								rgba(var(--base-200-rgb), 0.3),
								rgba(var(--base-200-rgb), 0.7)
							);

							&.active {
								border-color: var(--primary-500);
							}

							span {
								font-size: var(--fs-200);
								text-align: center;
							}

							.img {
								height: 100%;
								width: 100%;
								max-height: 110px;
								flex: 1 0 auto;
							}
						}
					}

					.frequencies {
						display: flex;
						justify-content: space-between;
						gap: 0.5rem;
						padding: 0 1.1rem;
						font-size: var(--fs-400);
						font-weight: 700;
						color: var(--base-800);
						text-align: center;

						span {
							position: relative;
							font-weight: 400;

							&::before {
								content: '';
								display: block;
								width: 1px;
								height: 1rem;
								background: var(--base-600);
								margin: 0 auto 0.5rem;
							}
						}
					}

					.error {
						text-align: right;
					}

					.input-w-icon {
						position: relative;
						display: flex;
						align-items: center;

						.icon {
							position: absolute;
							width: 24px;
							height: 24px;
							right: 0.5rem;

							&.check {
								color: var(--success-600);
							}

							&.x {
								color: var(--danger-600);
							}
						}
					}
				}

				footer {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					gap: 1rem;
				}
			}
		}
	}
</style>
