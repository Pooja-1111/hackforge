import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMessageSuggestions = async (amount, recipient) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate 3 short, professional, and friendly gift messages for a gift of $${amount} to ${recipient}. Keep them under 15 words each.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                }
            }
        });

        const text = response.text;
        if (!text) return ["Enjoy your gift!", "A small token of appreciation.", "Hope this makes your day!"];
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini suggestion error:", error);
        return ["Enjoy your gift!", "A small token of appreciation.", "Hope this makes your day!"];
    }
};
