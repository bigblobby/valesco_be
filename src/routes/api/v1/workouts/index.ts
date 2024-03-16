import express from 'express';
import catchAsync from '@/utils/catch-async';
import { workoutsController } from '@/controllers';
import { userGuard } from '@/guards';
import { validate } from '@/validators/zod/validator';
import { createWorkoutSchema } from '@/validators/zod/schemas/workouts.schema';

const router = express.Router();

router.post('/', userGuard, validate(createWorkoutSchema), catchAsync(workoutsController.create))
router.get('/', userGuard, catchAsync(workoutsController.getAll))
router.get('/:id', userGuard, catchAsync(workoutsController.getById))
router.delete('/:id', userGuard, catchAsync(workoutsController.delete))

export default router;