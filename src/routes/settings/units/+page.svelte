<script lang="ts">
	import type { LayoutData } from '../$types';

	import SettingsHeader from '$lib/containers/settings/SettingsHeader.svelte';

	import * as Select from '$lib/components/ui/select';
	import {
		type UserDataStoreContext,
		distanceUnits,
		measurementUnits,
		weightUnits
	} from '$lib/firebase/user/types';
	import { getContext } from 'svelte';
	import { updateUserData } from '$lib/firebase/user/actions';
	import { t } from 'svelte-i18n';

	export let data: LayoutData;

	$: ({ fRel } = data);

	const userData = getContext<UserDataStoreContext>('userData');

	let weightUnit = $userData.units.weight;
	const changeSelectedWeight = (opt: any) => {
		weightUnit = opt.value;
	};

	let distanceUnit = $userData.units.distance;
	const changeSelectedDistance = (opt: any) => {
		distanceUnit = opt.value;
	};

	let measurementUnit = $userData.units.bodyMeasurements;
	const changeSelectedMeasurement = (opt: any) => {
		measurementUnit = opt.value;
	};

	$: saveButtonEnabled =
		weightUnit !== $userData.units.weight ||
		distanceUnit !== $userData.units.distance ||
		measurementUnit !== $userData.units.bodyMeasurements;

	let loading = false;

	const onSave = async () => {
		loading = true;
		await updateUserData($userData.uid, {
			units: {
				weight: weightUnit,
				distance: distanceUnit,
				bodyMeasurements: measurementUnit
			}
		});
		loading = false;
	};
</script>

<SettingsHeader {fRel} {saveButtonEnabled} on:save={onSave} {loading} />

<section class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<h2 class="text-xl">{$t('pages.settings.units.weight')}</h2>
		<Select.Root
			onSelectedChange={changeSelectedWeight}
			selected={{ value: weightUnit, label: weightUnit }}
		>
			<Select.Trigger>
				<Select.Value placeholder={$t('pages.settings.units.select')} />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>{$t('pages.settings.units.weight')}</Select.Label>
					{#each weightUnits as unit}
						<Select.Item value={unit} label={unit}>{unit}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input />
		</Select.Root>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="text-xl">{$t('pages.settings.units.distance')}</h2>
		<Select.Root
			onSelectedChange={changeSelectedDistance}
			selected={{ value: distanceUnit, label: distanceUnit }}
		>
			<Select.Trigger>
				<Select.Value placeholder={$t('pages.settings.units.select')} />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>{$t('pages.settings.units.distance')}</Select.Label>
					{#each distanceUnits as unit}
						<Select.Item value={unit} label={unit}>{unit}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input />
		</Select.Root>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="text-xl">{$t('pages.settings.units.measurement')}</h2>
		<Select.Root
			onSelectedChange={changeSelectedMeasurement}
			selected={{ value: measurementUnit, label: measurementUnit }}
		>
			<Select.Trigger>
				<Select.Value placeholder={$t('pages.settings.units.select')} />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>{$t('pages.settings.units.measurement')}</Select.Label>
					{#each measurementUnits as unit}
						<Select.Item value={unit} label={unit}>{unit}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input />
		</Select.Root>
	</div>
</section>

<style lang="scss">
	section {
		padding: 1rem;
	}
</style>
