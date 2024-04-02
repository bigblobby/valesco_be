import { InternalServerErrorException } from '@/utils/errors';
import { Request, Response } from 'express';

const settingsController = {
    async getSettings(req: Request, res: Response) {
        const { data: settings, error } = await req.supabase
            .from('settings')
            .select('*')
            .eq('id', req.user?.id)
            .single();

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: '', error: '', data: settings });
    },

    async updateSettings(req: Request, res: Response){
        const { data, error } = await req.supabase.from('settings').upsert({
            id: req.user?.id,
            theme: req.body.theme,
        }).select().single();

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: 'Successfully updated settings', error: '', data: data });
    },
};

export default settingsController