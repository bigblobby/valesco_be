import dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export default {
    app: {
        port: process.env.PORT || 8080,
        env: process.env.NODE_ENV || 'development',
        supabase_url: process.env.PUBLIC_SUPABASE_URL,
        supabase_anon_key: process.env.PUBLIC_SUPABASE_ANON_KEY,
        openai_key: process.env.OPENAI_KEY,
    },
};