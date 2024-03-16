import { SupabaseClient } from '@supabase/supabase-js';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
        supabase: SupabaseClient;
    }
}