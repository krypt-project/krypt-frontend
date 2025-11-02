import { Mastra } from "mastra";
import { OpenAIProvider } from "mastra/openai";

export const mastra = new Mastra({
    providers: {
        openai: new OpenAIProvider({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
        }),
    }
});