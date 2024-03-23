import OpenAI from 'openai';
import appConfig from '@/config/app-config';

const openaiService = {
    openAI: new OpenAI({
        apiKey: appConfig.app.openai_key
    }),

    async generateWorkout(options: any) {
        let content = '';

        switch (options.type) {
            case 'gym_class':
                content = `Create a crossfit workout that is ${options.length} mins long. First a warm up (never running or jogging), then a skill/strength section, then a WOD, nothing else. Include scaled movements. Text should show the workout only, respond in markdown.`;
                break;
            case 'wod':
                content = `Create a crossfit wod workout that is ${options.length} mins long. Text should show the workout only, respond in markdown.`;
                break;
            case 'hero':
                content = `Create a crossfit hero workout. Text should show the workout only. Text should show the workout only, respond in markdown.`;
                break;
        }


        try {
            const completion = await this.openAI.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful personal trainer that specialises in crossfit and will suggest a wide variety of exercises.`
                    },
                    {
                        role: 'user',
                        content: content,
                    }
                ],
                model: 'gpt-3.5-turbo-0125',
            });

            return completion.choices[0].message.content;
        } catch (err) {
            throw new Error(`Can't generate workout`);
        }
    }
};

export default openaiService;