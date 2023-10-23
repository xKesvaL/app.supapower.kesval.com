import type { PredefinedWorkout } from '$lib/stores/currentWorkout/types';
import { predefinedWorkouts } from './predefinedWorkouts';

export interface ProgramList {
	[key: string]: {
		[key: string]: PredefinedWorkout;
	};
}

export const predefinedPrograms: ProgramList = {
	ppl: {
		push: predefinedWorkouts['ppl.push'] as PredefinedWorkout,
		pull: predefinedWorkouts['ppl.pull'] as PredefinedWorkout,
		legs: predefinedWorkouts['ppl.legs'] as PredefinedWorkout
	},
	upperLower: {
		upper: predefinedWorkouts['upperLower.upper'] as PredefinedWorkout,
		lower: predefinedWorkouts['upperLower.lower'] as PredefinedWorkout
	}
};
