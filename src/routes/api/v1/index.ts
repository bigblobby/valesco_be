import express from 'express';
import workoutsRouter from '@/routes/api/v1/workouts';
import settingsRouter from '@/routes/api/v1/settings';

const router = express.Router();

router.use('/workouts', workoutsRouter);
router.use('/settings', settingsRouter);

export default router;