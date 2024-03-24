import { Request, Response } from 'express';
import workoutsService from '@/services/workouts.service';

const workoutsController = {
    async createWorkout(req: Request, res: Response) {
        const data = await workoutsService.createWorkout(req);

        res.json({ message: 'Workout created', error: '', data: data });
    },

    async getAllWorkouts(req: Request, res: Response) {
        const workouts = await workoutsService.getWorkouts(req);
        const count = await workoutsService.getWorkoutsCount(req);

        res.json({ message: '', error: '', data: { workouts: workouts, count: count } });
    },

    async getWorkoutById(req: Request, res: Response) {
        const workout = await workoutsService.getWorkoutById(req);

        res.json({ message: '', error: '', data: workout });
    },

    async getWorkoutsCount(req: Request, res: Response) {
        const count = await workoutsService.getWorkoutsCount(req);

        res.json({ message: '', error: '', data: count });
    },

    async deleteWorkout(req: Request, res: Response) {
        await workoutsService.deleteWorkout(req);

        res.json({ message: 'Successfully deleted workout', error: '', data: null });
    }
};

export default workoutsController;