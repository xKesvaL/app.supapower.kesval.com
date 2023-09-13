import type { Exercise } from './types/exerciseTypes';

export const exerciseList: Exercise[] = [
	{
		name: 'Squat',
		primaryMuscle: { name: 'quadriceps', activation: 100 },
		otherMuscles: [
			{ name: 'abductors', activation: 60 },
			{ name: 'glutes', activation: 46 },
			{ name: 'abdominals', activation: 31 },
			{ name: 'lowerback', activation: 40 },
			{ name: 'obliques', activation: 43 }
		],
		equipment: 'barbell',
		type: 'weight-reps'
	}
];
