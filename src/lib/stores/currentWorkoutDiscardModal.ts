import { writable } from 'svelte/store';
import { overlayShown } from './overlay';

const createCurrentWorkoutDiscardModalState = () => {
	const { subscribe, set } = writable<boolean>(false);

	return {
		subscribe,
		set: (value: boolean) => {
			overlayShown.set(value);
			set(value);
		}
	};
};

export const currentWorkoutDiscardModalState = createCurrentWorkoutDiscardModalState();
