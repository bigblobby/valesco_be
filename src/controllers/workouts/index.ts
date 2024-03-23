import { InternalServerErrorException, NotFoundException } from '@/utils/errors';
import { Request, Response } from 'express';
import openaiService from '@/services/openai.service';

const workoutsController = {
    async create(req: Request, res: Response) {
        const content = await openaiService.generateWorkout({
            length: req.body.length,
            type: req.body.type,
        });

        if (content) {
            const { data, error } = await req.supabase.from('workouts').insert({
                user_id: req.user.id,
                name: req.body.name,
                type: req.body.type,
                length: req.body.length,
                content: content,
            }).select().single();

            if (error) throw new InternalServerErrorException(error.message);

            res.json({ message: 'Workout created', error: '', data: data });
        } else {
            throw new InternalServerErrorException('Something went wrong');
        }
    },

    async getAll(req: Request, res: Response) {
        const page = Number(req.query.page || 1);
        const limit = 12;

        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })
            .range((page - 1) * limit, (limit * page) - 1)

        if (error) throw new InternalServerErrorException(error.message);
        if (data.length === 0) {
            return res.json({ message: '', error: '', data: { workouts: data, count: 0 } });
        }

        const { count, error: countError } = await req.supabase
            .from('workouts')
            .select('*', { count: 'exact', head: true })

        if (!count) throw new NotFoundException();
        if (countError) throw new InternalServerErrorException(countError);

        res.json({ message: '', error: '', data: { workouts: data, count: count } });
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

    async getCount(req: Request, res: Response) {
        const { count, error } = await req.supabase
            .from('workouts')
            .select('*', { count: 'exact', head: true })

        if (count === 0) {
            return res.json({ message: '', error: '', data: 0 });
        }

        if (!count) throw new NotFoundException();
        if (error) throw new InternalServerErrorException(error);

        res.json({ message: '', error: '', data: count });
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