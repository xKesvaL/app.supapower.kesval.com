import type { Exercise } from './types/exerciseTypes';

export const exerciseList: Exercise[] = [
	{
		name: 'Squat',
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
		name: 'Bench Press',
		primaryMuscle: { name: 'chest', activation: 90 },
		otherMuscles: [
			{ name: 'shoulders-anterior', activation: 56 },
			{ name: 'triceps', activation: 44 }
		],
		equipment: 'barbell',
		type: 'weight-reps'
	},
	{
		name: 'Deadlift',
		primaryMuscle: { name: 'lowerback', activation: 95 },
		otherMuscles: [
			{ name: 'hamstrings', activation: 80 },
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
