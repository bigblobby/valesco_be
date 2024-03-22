import { InternalServerErrorException } from '@/utils/errors';
import { Request, Response } from 'express';

const settingsController = {
    async updateSettings(req: Request, res: Response){
        const { data, error } = await req.supabase.from('settings').upsert({
            id: req.user?.id,
            theme: req.body.theme,
        });

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: 'Successfully updated settings', error: '', data: data });
    },
};

export default settingsController