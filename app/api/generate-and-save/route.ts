import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Temporary memory store (Note: for production scaling, use a database later)
global.sitesDatabase = global.sitesDatabase || {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subdomain, tokenName, ticker, prompt, presaleWallet, telegram, twitter } = body;

    if (!subdomain || !tokenName || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const systemInstruction = `You are an expert Web3 landing page developer. Generate a complete, standalone, highly engaging single-page HTML website for a meme coin in English.
Return ONLY raw valid HTML code without markdown formatting or markdown backticks (\`\`\`html).
Include modern CSS in a <style> tag.
Make the layout dark-themed, flashy, crypto-native, and responsive.
Include:
- Hero header with Token Name (${tokenName}) and Ticker (${ticker})
- Engaging narrative based on the user prompt: "${prompt}"
- Presale box displaying the deposit wallet: "${presaleWallet}" with a Copy button.
- Social buttons for Telegram (${telegram || '#'}) and Twitter (${twitter || '#'}).
- Disclaimer at footer.`;

    // Using the stable and supported Gemini model
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      }
    });

    let generatedHtml = response.text || '<h1>Error generating site HTML</h1>';
    generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, '').trim();

    const cleanSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    global.sitesDatabase[cleanSubdomain] = generatedHtml;

    // Return direct preview URL pointing to your app
    const hostHeader = request.headers.get('host') || 'localhost:3000';
    const protocol = hostHeader.includes('localhost') ? 'http' : 'https';
    const siteUrl = `${protocol}://${hostHeader}/preview/${cleanSubdomain}`;

    return NextResponse.json({ 
      success: true, 
      siteUrl, 
      tokenName, 
      ticker, 
      presaleWallet 
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
