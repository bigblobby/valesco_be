import express from 'express';
import { workoutsController } from '@/controllers';
import { userGuard } from '@/guards';
import { validate } from '@/validators/zod/validator';
import { createWorkoutSchema } from '@/validators/zod/schemas/workouts.schema';

const router = express.Router();

router.post('/', userGuard, validate(createWorkoutSchema), workoutsController.create)
router.get('/', userGuard, workoutsController.getAll)
router.get('/:id', userGuard, workoutsController.getById)
router.delete('/:id', userGuard, workoutsController.delete)

export default router;