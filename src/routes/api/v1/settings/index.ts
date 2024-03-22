import express from 'express';
import { settingsController } from '@/controllers'
import { userGuard } from '@/guards';
import { validate } from '@/validators/zod/validator';
import { updateSettingsSchema } from '@/validators/zod/schemas/settings.schema';

const router = express.Router();

router.put('/', userGuard, validate(updateSettingsSchema), settingsController.updateSettings);

export default router;