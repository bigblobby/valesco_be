import { Request, Response } from 'express';
import { workoutsPreMadeService } from '@/services';

const workoutsPreMadeController = {
    async getAllWorkouts(req: Request, res: Response) {
        const { collection } = req.query;
        const data = await workoutsPreMadeService.getJSONFileContents(String(collection));

        res.json({ message: '', error: '', data: { workouts: data, count: data.length } });
    },
};

export default workoutsPreMadeController;