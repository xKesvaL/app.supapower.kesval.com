export const muscles = [
	'abdominals',
	'abductors',
	'adductors',
	'biceps',
	'calves',
	'cardio',
	'chest',
	'quadriceps',
	'forearms',
	'glutes',
	'hamstrings',
	'lats',
	'lowerback',
	'neck',
	'obliques',
	'shoulders',
	'shoulders-anterior',
	'shoulders-medial',
	'shoulders-posterior',
	'traps',
	'triceps',
	'upperback'
] as const;

export type Muscle = (typeof muscles)[number];

export interface MuscleExercise {
	name: Muscle;
	activation: number;
}
