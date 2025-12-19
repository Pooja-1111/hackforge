import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMessageSuggestions = async (amount, recipient, tone = 'Friendly', context = '') => {
    try {
        // Add randomness to prompt to ensure variety on repeated calls with same inputs
        const prompt = `Generate 5 distinctly different ${tone} gift messages for a gift of ₹${amount} to ${recipient}. ${context ? `Occasion/Context: ${context}.` : ''} 
        Rules:
        1. Keep them unique, engaging, and under 20 words each.
        2. Vary the structure and vocabulary significantly between options.
        3. Do not repeat the same opening words.
        4. Make them sound like a human wrote them.
        Random Seed: ${Math.random()}`;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
                temperature: 0.9, // Higher creativity
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
