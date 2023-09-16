// These are the defaults workouts provided by the app.
// More workouts can be added by the user or found in the community.

import type { ExerciseName } from './types/exerciseTypes';

export interface WorkoutExerciseSet {
	type: 'warmup' | 'working';
	weight: number;
	weightType: 'static' | 'percentage';
	reps: number;
	rpe: number;
}

export interface WorkoutExercise {
	exerciseName: ExerciseName;
	sets: WorkoutExerciseSet[];
}

export type Workout = WorkoutExercise[];

export interface WorkoutList {
	[key: string]: Workout;
}

export const workoutsList: WorkoutList = {
	'ppl.push': [
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
	],
	'ppl.pull': [
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
	],
	'ppl.legs': [
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
	],
	'upperLower.upper': [
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
	],
	'upperLower.lower': [
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
};
