import OpenAI from 'openai';
import appConfig from '@/config/app-config';

const openaiService = {
    openAI: new OpenAI({
        apiKey: appConfig.app.openai_key
    }),

    async generateWorkout() {
        try {
            const completion = await this.openAI.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful personal trainer that specialises in crossfit and will suggest a wide variety of exercises.`
                    },
                    {
                        role: 'user',
                        content: `Create a crossfit workout. First a warm up (never running or jogging), then a skill/strength section, then a WOD, nothing else. Include scaled movements. Respond in markdown.`
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