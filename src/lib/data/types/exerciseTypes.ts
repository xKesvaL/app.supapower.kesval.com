import type { Equipment } from './equipmentTypes';
import type { MuscleExercise } from './muscleTypes';

export interface Exercise {
	name: string;
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

export type ExerciseType = (typeof exerciseTypes)[keyof typeof exerciseTypes];
