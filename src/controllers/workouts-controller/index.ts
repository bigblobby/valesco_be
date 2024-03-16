import { InternalServerErrorException } from '@/utils/errors';
import { z } from 'zod';
import OpenAI from 'openai';
import appConfig from '@/config/app-config';

const createWorkoutSchema = z.object({
    name: z.string().min(1),
});

const openAi = new OpenAI({
    apiKey: appConfig.app.openai_key
});

const workoutsController = {
    async create(req, res) {
        const parsedData = createWorkoutSchema.safeParse({
            name: req.body.name,
        })

        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.message, message: '', data: null });
        }

        // const completion = await openAi.chat.completions.create({
        //     messages: [
        //         {
        //             role: 'system',
        //             content: `You are a helpful personal trainer that specialises in crossfit and will suggest a wide variety of exercises.`
        //         },
        //         {
        //             role: "user",
        //             content: `Create a crossfit workout. First a warm up (never running or jogging), then a skill/strength section, then a WOD, nothing else. Include scaled movements. Respond in markdown.`
        //         }
        //     ],
        //     model: "gpt-3.5-turbo-0125",
        // });
        //
        // const content = completion.choices[0].message.content;

        if (true) {
            const {data, error} = await req.supabase.from('workouts').insert({
                user_id: req.user.id,
                name: req.body.name,
                content: 'test',
            }).select();

            if (error) throw new InternalServerErrorException(error.message);

            res.json({ message: 'Workout created', error: '', data: data?.[0] });
        } else {
            throw new InternalServerErrorException('Something went wrong');
        }

    },

    async getAll(req, res) {
        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });


        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: '', error: '', data: data });
    },

    async getById(req, res) {
        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('id', req.params.id)

        if (error) throw new InternalServerErrorException(error.message);

        res.json({ message: '', error: '', data: data[0] });
    },

    async delete(req, res) {
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