import { InternalServerErrorException, NotFoundException } from '@/utils/errors';
import { Request, Response } from 'express';
import openaiService from '@/services/openai.service';

const workoutsController = {
    async create(req: Request, res: Response) {
        const content = await openaiService.generateWorkout();

        if (content) {
            const { data, error } = await req.supabase.from('workouts').insert({
                user_id: req.user.id,
                name: req.body.name,
                content: content,
            }).select().single();

            if (error) throw new InternalServerErrorException(error.message);

            res.json({ message: 'Workout created', error: '', data: data });
        } else {
            throw new InternalServerErrorException('Something went wrong');
        }
    },

    async getAll(req: Request, res: Response) {
        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: '', error: '', data: data });
    },

    async getById(req: Request, res: Response) {
        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('id', req.params.id)
            .maybeSingle();

        if (!data) throw new NotFoundException();
        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: '', error: '', data: data });
    },

    async delete(req: Request, res: Response) {
        const { error } = await req.supabase
            .from('workouts')
            .delete()
            .eq('user_id', req.user.id)
            .eq('id', req.params.id)
            .single();

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: 'Successfully deleted workout', error: '', data: null });
    }
};

export default workoutsController;