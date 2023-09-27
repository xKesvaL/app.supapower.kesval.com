import type { Exercise } from './types/exerciseTypes';

export const exerciseList: Exercise[] = [
	{
		name: 'squat',
		primaryMuscle: { name: 'quadriceps', activation: 78 },
		otherMuscles: [
			{ name: 'abductors', activation: 60 },
			{ name: 'glutes', activation: 46 },
			{ name: 'obliques', activation: 43 },
			{ name: 'lowerback', activation: 40 },
			{ name: 'abdominals', activation: 31 }
		],
		equipment: 'barbell',
		type: 'weight-reps'
	},
	{
		name: 'bench',
		primaryMuscle: { name: 'chest', activation: 90 },
		otherMuscles: [
			{ name: 'shoulders-anterior', activation: 56 },
			{ name: 'triceps', activation: 44 }
		],
		equipment: 'barbell',
		type: 'weight-reps'
	},
	{
		name: 'deadlift',
		primaryMuscle: { name: 'hamstrings', activation: 80 },
		otherMuscles: [
			{ name: 'lowerback', activation: 90 },
			{ name: 'glutes', activation: 64 },
			{ name: 'quadriceps', activation: 43 },
			{ name: 'forearms', activation: 34 },
			{ name: 'abdominals', activation: 31 },
			{ name: 'lats', activation: 26 }
		],
		equipment: 'barbell',
		type: 'weight-reps'
	}
];
