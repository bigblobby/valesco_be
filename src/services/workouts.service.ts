import { getRandomNumberBetween } from '@/utils/number.utils';
import heroWods from '../../json/crossfit-main-hero-wods.json';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import openaiService from '@/services/openai.service';
import { InternalServerErrorException, NotFoundException } from '@/utils/errors';
import { Request } from 'express';

const workoutsService = {
    async createWorkout(req: Request){
        let content: string | null;

        if (req.body.type === 'hero') {
            content = await workoutsService.getHeroWorkout();
        } else {
            content = await openaiService.generateWorkout({
                length: req.body.length,
                type: req.body.type,
            });
        }

        if (content) {
            const { data, error } = await req.supabase.from('workouts').insert({
                user_id: req.user.id,
                name: req.body.name,
                type: req.body.type,
                length: req.body.length,
                content: content,
            }).select().single();

            if (error) throw new InternalServerErrorException(error.message);

            return data;
        } else {
            throw new InternalServerErrorException('Something went wrong');
        }
    },

    async getWorkouts(req: Request){
        const page = Number(req.query.page || 1);
        const limit = 12;

        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })
            .range((page - 1) * limit, (limit * page) - 1)

        if (error) throw new InternalServerErrorException(error.message);

        return data;
    },

    async getWorkoutById(req: Request) {
        const { data, error } = await req.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('id', req.params.id)
            .maybeSingle();

        if (!data) throw new NotFoundException();
        if (error) throw new InternalServerErrorException(error.message);

        return data;
    },

    async getWorkoutsCount(req: Request) {
        const { count, error: countError } = await req.supabase
            .from('workouts')
            .select('*', { count: 'exact', head: true })

        if (count === null) throw new NotFoundException();
        if (countError) throw new InternalServerErrorException(countError);

        return count;
    },

    async getHeroWorkout() {
        const randomIndex = getRandomNumberBetween(0, heroWods.length);
        const wod = heroWods[randomIndex];
        const content = `<h2>${wod.title}</h2> <br /> ${wod.line_one?.replace(/\n/g, '<br />')} <br /> <br /> ${wod?.line_two?.replace(/\n/g, '<br />')} <br /> <br /> ${wod?.line_three?.replace(/\n/g, '<br />')}`;
        return NodeHtmlMarkdown.translate(content);
    },

    async deleteWorkout(req: Request) {
        const { error } = await req.supabase
            .from('workouts')
            .delete()
            .eq('user_id', req.user.id)
            .eq('id', req.params.id)
            .single();

        if (error) throw new InternalServerErrorException(error.message);
    }
};

export default workoutsService;