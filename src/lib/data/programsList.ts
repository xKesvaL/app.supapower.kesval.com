import { workoutsList, type Workout } from './workoutsList';

export interface ProgramList {
	[key: string]: {
		[key: string]: Workout;
	};
}

export const programsList: ProgramList = {
	ppl: {
		push: workoutsList['ppl.push'] as Workout,
		pull: workoutsList['ppl.pull'] as Workout,
		legs: workoutsList['ppl.legs'] as Workout
	},
	upperLower: {
		upper: workoutsList['upperLower.upper'] as Workout,
		lower: workoutsList['upperLower.lower'] as Workout
	}
};
