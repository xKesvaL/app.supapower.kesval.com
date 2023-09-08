import { z } from 'zod';
import { workoutTypes } from './types';

export const UserDataWorkoutSchema = z.object({
	type: z.union([
		z.literal(workoutTypes[0]),
		z.literal(workoutTypes[1]),
		z.literal(workoutTypes[2])
	]),
	frequency: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
});
