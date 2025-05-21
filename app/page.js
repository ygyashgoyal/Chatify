'use client';

import { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GENAI_API_KEY,
});

export default function Page() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAIResponse() {
      try {
        const result = await genAI.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: 'Explain how AI works in a few words',
        });

        const text = result.candidates[0].content.parts[0].text;
        setResponse(text);
      } catch (error) {
        console.error('Failed to fetch AI response:', error);
        setResponse('Error fetching response.');
      } finally {
        setLoading(false);
      }
    }

    fetchAIResponse();
  }, []);

  return (
    <main className="p-8 max-w-2xl mx-auto mt-12 bg-white shadow-md rounded-xl max-h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🤖 Gemini AI Response</h1>
      {loading ? (
        <p className="text-gray-500 animate-pulse">Fetching response...</p>
      ) : (
        <p className="text-gray-700 whitespace-pre-line">{response}</p>
      )}
    </main>
  );
}
