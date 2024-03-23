import { z } from 'zod';

export const profilesSettingsSchema = z.object({
    body: z.object({
        username: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        height_feet: z.number(),
        height_inches: z.number(),
        weight: z.number(),
        activity_level: z.enum( [ 'none', 'light', 'moderate' , 'daily', 'heavy', 'athlete' ] ).nullable(),
    }),
});