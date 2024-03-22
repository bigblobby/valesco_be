import express from 'express';
import workoutsRouter from '@/routes/api/v1/workouts';
import settingsRouter from '@/routes/api/v1/settings';
import profilesRouter from '@/routes/api/v1/profiles';

const router = express.Router();

router.use('/workouts', workoutsRouter);
router.use('/settings', settingsRouter);
router.use('/profiles', profilesRouter);

export default router;