export const equipments = [
	'none',
	'barbell',
	'cable',
	'dumbbell',
	'kettlebell',
	'machine',
	'plate',
	'resistanceband',
	'suspensionband',
	'other'
] as const;

export type Equipment = (typeof equipments)[keyof typeof equipments];
