// These are the defaults workouts provided by the app.
// More workouts can be added by the user or found in the community.

import type { PredefinedWorkout } from '$lib/firebase/workout/types';

export interface WorkoutList {
	[key: string]: PredefinedWorkout;
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
						done: false
					}
				],
				timer: 120
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
						done: false
					}
				],
				timer: 120
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
						done: false
					}
				],
				timer: 120
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
						done: false
					}
				],
				timer: 120
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
						done: false
					}
				],
				timer: 120
			}
		]
	}
};
