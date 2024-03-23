import { z } from 'zod';

export const updateSettingsSchema = z.object({
    body: z.object({
        theme: z.enum(['system', 'dark', 'light']),
    }),
});