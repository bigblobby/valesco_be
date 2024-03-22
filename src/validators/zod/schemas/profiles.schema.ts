import { z } from 'zod';

export const profilesSettingsSchema = z.object({
    body: z.object({
        username: z.string(),
        first_name: z.string(),
        last_name: z.string(),
    }),
});