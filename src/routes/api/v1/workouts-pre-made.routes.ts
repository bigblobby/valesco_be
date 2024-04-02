import express from 'express';
import { workoutsPreMadeController } from '@/controllers';
import { userGuard } from '@/guards';
import { validate } from '@/validators/zod/validator';
import { workoutPreMadeGetAllSchema } from '@/validators/zod/schemas/workouts-pre-made.schema';

const router = express.Router();

router.get('/', userGuard, validate(workoutPreMadeGetAllSchema), workoutsPreMadeController.getAllWorkouts);

export default router;