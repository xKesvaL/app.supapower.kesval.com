import type { Workout } from '$lib/firebase/workout/types';
import { predefinedWorkouts } from './predefinedWorkouts';

export interface ProgramList {
	[key: string]: {
		[key: string]: Workout;
	};
}

export const predefinedPrograms: ProgramList = {
	ppl: {
		push: predefinedWorkouts['ppl.push'] as Workout,
		pull: predefinedWorkouts['ppl.pull'] as Workout,
		legs: predefinedWorkouts['ppl.legs'] as Workout
	},
	upperLower: {
		upper: predefinedWorkouts['upperLower.upper'] as Workout,
		lower: predefinedWorkouts['upperLower.lower'] as Workout
	}
};
