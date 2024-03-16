import express from 'express';
import apiV1Router from '@/routes/api/v1';

const router = express.Router();

router.use('/api/v1', apiV1Router);

export default router;