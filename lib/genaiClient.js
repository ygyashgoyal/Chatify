import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.NEXT_PUBLIC_GENAI_API_KEY;

const genAI = new GoogleGenAI({ apiKey });

export async function getAIResponse(prompt) {
  const result = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });

  return result.candidates[0].content.parts[0].text;
}
