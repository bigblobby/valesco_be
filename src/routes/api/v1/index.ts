import express from 'express';
import workoutsRouter from '@/routes/api/v1/workouts';

const router = express.Router();

router.use('/workouts', workoutsRouter);

export default router;