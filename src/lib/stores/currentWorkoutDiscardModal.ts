import { writable } from 'svelte/store';

const createCurrentWorkoutDiscardModalState = () => {
  const { subscribe, set } = writable<boolean>(false);

  return {
    subscribe,
    set
  };
}

export const currentWorkoutDiscardModalState = createCurrentWorkoutDiscardModalState();