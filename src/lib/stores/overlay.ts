import { writable } from 'svelte/store';

const DEFAULT_OVERLAY_STRENGTH = 0.85;

const createOverlayShownState = () => {
	const { subscribe, set } = writable<boolean>(false);

	return {
		subscribe,
		set: (value: boolean) => {
			if (value === false) {
				overlayStrength.set(DEFAULT_OVERLAY_STRENGTH);
			}
			set(value);
		}
	};
};

export const overlayShown = createOverlayShownState();

const createOverlayStrengthState = () => {
	const { subscribe, set } = writable<number>(DEFAULT_OVERLAY_STRENGTH);

	return {
		subscribe,
		set
	};
};

export const overlayStrength = createOverlayStrengthState();
