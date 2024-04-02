import express from 'express';
import workoutsRouter from '@/routes/api/v1/workouts.routes';
import workoutsPreMadeRouter from '@/routes/api/v1/workouts-pre-made.routes';
import settingsRouter from '@/routes/api/v1/settings.routes';
import profilesRouter from '@/routes/api/v1/profiles.routes';

const router = express.Router();

router.use('/workouts', workoutsRouter);
router.use('/workouts-pre-made', workoutsPreMadeRouter);
router.use('/settings', settingsRouter);
router.use('/profiles', profilesRouter);

export default router;