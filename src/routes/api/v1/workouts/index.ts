import express from 'express';
import { workoutsController } from '@/controllers';
import { userGuard } from '@/guards';
import { validate } from '@/validators/zod/validator';
import { createWorkoutSchema } from '@/validators/zod/schemas/workouts.schema';

const router = express.Router();

router.post('/', userGuard, validate(createWorkoutSchema), workoutsController.createWorkout);
router.get('/', userGuard, workoutsController.getAllWorkouts);
router.get('/count', userGuard, workoutsController.getWorkoutsCount);
router.get('/:id', userGuard, workoutsController.getWorkoutById);
router.delete('/:id', userGuard, workoutsController.deleteWorkout);

export default router;