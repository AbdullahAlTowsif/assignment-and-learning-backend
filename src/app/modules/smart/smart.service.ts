import axios from "axios";
import { envVars } from "../../config/env";

const openRouterClient = axios.create({
    baseURL: envVars.OPENROUTER_BASE_URL,
    headers: {
        Authorization: `Bearer ${envVars.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
    },
});

// Generate Feedback
const generateFeedback = async (studentNote: string) => {
    try {
        const response = await openRouterClient.post("/chat/completions", {
            model: "openai/gpt-3.5-turbo", // ✅ cheap & available
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful programming instructor giving short constructive feedback.",
                },
                {
                    role: "user",
                    content: `Student note: "${studentNote}". Give helpful feedback.`,
                },
            ],
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        // 🔥 fallback (VERY IMPORTANT)
        return `Good attempt! Based on your note "${studentNote}", try to explain your logic more clearly and add examples.`;
    }
};

// Improve Assignment Description
const improveDescription = async (description: string) => {
    try {
        const response = await openRouterClient.post("/chat/completions", {
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You improve assignment descriptions to make them clearer and professional.",
                },
                {
                    role: "user",
                    content: `Improve this assignment description:\n"${description}"`,
                },
            ],
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        return `Improved version: ${description} (Make it more structured and clear with proper instructions.)`;
    }
};

export const SmartService = {
    generateFeedback,
    improveDescription,
};
