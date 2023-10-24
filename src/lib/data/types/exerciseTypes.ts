import type { Equipment } from './equipmentTypes';
import type { MuscleExercise } from './muscleTypes';

export interface Exercise {
	name: ExerciseName;
	primaryMuscle: MuscleExercise;
	otherMuscles: MuscleExercise[];
	equipment: Equipment;
	type: ExerciseType;
}

export const exerciseTypes = [
	'weight-reps',
	'weight-distance',
	'bodyweight-reps',
	'bodyweight-reps-weighted',
	'bodyweight-reps-assisted',
	'duration',
	'duration-distance'
] as const;

export const exerciseNames = [
	'squat',
	'bench',
	'bench-dumbbell',
	'bench-incline',
	'bench-incline-dumbbell',
	'shoulder-press',
	'shoulder-press-dumbbell',
	'lateral-raise',
	'deadlift'
] as const;

export type ExerciseType = (typeof exerciseTypes)[number];

export type ExerciseName = (typeof exerciseNames)[number];
