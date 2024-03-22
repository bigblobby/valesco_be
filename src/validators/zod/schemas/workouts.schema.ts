import { z } from 'zod';

export const createWorkoutSchema = z.object({
    body: z.object({
        name: z.enum(['system', 'dark', 'light']),
    }),
});