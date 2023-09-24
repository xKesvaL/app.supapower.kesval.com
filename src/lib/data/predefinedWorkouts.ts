// These are the defaults workouts provided by the app.
// More workouts can be added by the user or found in the community.

import type { Workout } from '$lib/firebase/workout/types';

export interface WorkoutList {
	[key: string]: Workout;
}

export const predefinedWorkouts: WorkoutList = {
	'ppl.push': {
		exercises: [
			{
				exerciseName: 'squat',
				sets: [
					{
						type: 'warmup',
						reps: 8,
						rpe: 5,
						weight: 40,
						weightType: 'percentage'
					}
				]
			}
		]
	},
	'ppl.pull': {
		exercises: [
			{
				exerciseName: 'squat',
				sets: [
					{
						type: 'warmup',
						reps: 8,
						rpe: 5,
						weight: 40,
						weightType: 'percentage'
					}
				]
			}
		]
	},
	'ppl.legs': {
		exercises: [
			{
				exerciseName: 'squat',
				sets: [
					{
						type: 'warmup',
						reps: 8,
						rpe: 5,
						weight: 40,
						weightType: 'percentage'
					}
				]
			}
		]
	},
	'upperLower.upper': {
		exercises: [
			{
				exerciseName: 'squat',
				sets: [
					{
						type: 'warmup',
						reps: 8,
						rpe: 5,
						weight: 40,
						weightType: 'percentage'
					}
				]
			}
		]
	},
	'upperLower.lower': {
		exercises: [
			{
				exerciseName: 'squat',
				sets: [
					{
						type: 'warmup',
						reps: 8,
						rpe: 5,
						weight: 40,
						weightType: 'percentage'
					}
				]
			}
		]
	}
};
