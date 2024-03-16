import express from 'express';
import workoutsRouter from '@/routes/api/v1/workouts-router';

const router = express.Router();

router.use('/workouts', workoutsRouter);

export default router;