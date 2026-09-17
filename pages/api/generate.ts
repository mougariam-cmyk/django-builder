import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a professional crypto presale and landing page based on this description: ${prompt}. Return a clean description message confirming success.`,
    });

    const text = response.text || "Landing page generated successfully!";

    return res.status(200).json({
      success: true,
      message: text,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
