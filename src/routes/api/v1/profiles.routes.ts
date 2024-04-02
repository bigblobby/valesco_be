import express from 'express';
import { profilesController } from '@/controllers'
import { userGuard } from '@/guards';
import { validate } from '@/validators/zod/validator';
import { profilesSettingsSchema } from '@/validators/zod/schemas/profiles.schema';

const router = express.Router();

router.get('/', userGuard, profilesController.getProfile);
router.put('/', userGuard, validate(profilesSettingsSchema), profilesController.updateProfile);

export default router;