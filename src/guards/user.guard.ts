import { BadRequestException, UnauthorizedException } from '@/utils/errors';
import { createClient } from '@supabase/supabase-js';
import appConfig from '@/config/app-config';
import { NextFunction, Request, Response } from 'express';

const userGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const supabase = createClient(
            appConfig.app.supabase_url!,
            appConfig.app.supabase_anon_key!,
            {
                global: {
                    headers: { Authorization: req.headers.authorization! },
                }
            }
        );

        let access_token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }


        if (!access_token) return next(new UnauthorizedException('You must be logged in.'));

        const {
            data: { user },
            error
        } = await supabase.auth.getUser();

        if (!user) return next(new BadRequestException('User does not exist.'));
        if (error) return next(new BadRequestException(error.message));

        req.user = user;
        req.supabase = supabase;
        next();
    } catch (err) {
        next(err);
    }
};

export default userGuard;