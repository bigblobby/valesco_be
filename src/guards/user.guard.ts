import { BadRequestException, UnauthorizedException } from '@/utils/errors';
import { createClient } from '@supabase/supabase-js';
import appConfig from '@/config/app-config';

const userGuard = async(req, res, next) => {
    try {
        const supabase = createClient(appConfig.app.supabase_url!, appConfig.app.supabase_anon_key!);
        let access_token;
        let refresh_token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }

        if (req.headers.refreshtoken) {
            refresh_token = req.headers.refreshtoken;
        }

        if(!access_token) return next(new UnauthorizedException('You must be logged in.'));
        if(!refresh_token) return next(new UnauthorizedException('You must have a valid refresh token'));

        const {data, error} = await supabase.auth.setSession({
            access_token: access_token,
            refresh_token: refresh_token,
        });

        if(!data.user) return next(new BadRequestException('User does not exist.'));
        if(error) return next(new BadRequestException(error.message));

        req.user = data.user;
        req.supabase = supabase;
        next();
    } catch(err){
        next(err);
    }
};

export default userGuard;