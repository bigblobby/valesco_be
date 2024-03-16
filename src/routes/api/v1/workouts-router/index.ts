import express from 'express';
import catchAsync from '@/utils/catch-async';
import workoutsController from '@/controllers/workouts-controller';
import guard from '@/guards';

const router = express.Router();

router.post('/', guard.userGuard, catchAsync(workoutsController.create))
router.get('/', guard.userGuard, catchAsync(workoutsController.getAll))
router.get('/:id', guard.userGuard, catchAsync(workoutsController.getById))
router.delete('/:id', guard.userGuard, catchAsync(workoutsController.delete))

export default router;