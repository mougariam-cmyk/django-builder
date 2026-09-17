import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, currentConfig } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert web designer and copywriter specializing in meme coins and Web3 tokens.
Update or create JSON configuration for a meme coin website based on the prompt.
Prompt: "${prompt}"
Current Config: ${JSON.stringify(currentConfig || {})}

Return ONLY a valid JSON object matching this schema:
{
  "title": "Token Title",
  "ticker": "TICKER",
  "theme": "dark" | "light" | "neon",
  "primaryColor": "hex color",
  "heroText": "Catchy tag line",
  "description": "Short description",
  "roadmap": ["Step 1", "Step 2", "Step 3"],
  "tokenomics": {
    "totalSupply": "1,000,000,000",
    "tax": "0%",
    "lpStatus": "Burned"
  }
}`
    });

    const text = response.text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }

    const jsonConfig = JSON.parse(jsonMatch[0]);
    return res.status(200).json(jsonConfig);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to generate content' });
  }
}
