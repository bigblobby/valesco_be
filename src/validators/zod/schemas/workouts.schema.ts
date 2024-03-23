import { z } from 'zod';

export const createWorkoutSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        length: z.enum(['15', '20', '30', '45', '60', '120']),
        type: z.enum(['gym_class', 'wod']),
    }),
});