import { InternalServerErrorException } from '@/utils/errors';
import { Request, Response } from 'express';

const profileController = {
    async getProfile(req: Request, res: Response){
        const { data: profile, error } = await req.supabase
            .from('profiles')
            .select('*')
            .eq('id', req.user?.id)
            .single();

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: '', error: '', data: profile });
    },

    async updateProfile(req: Request, res: Response){
        const { data, error } = await req.supabase.from('profiles').upsert({
            id: req.user?.id,
            username: req.body?.username,
            first_name: req.body?.first_name,
            last_name: req.body?.last_name,
        });

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: 'Successfully updated profile', error: '', data: data });
    },
};

export default profileController