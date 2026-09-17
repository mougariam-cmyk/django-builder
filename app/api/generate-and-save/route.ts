import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

global.sitesDatabase = global.sitesDatabase || {};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing' }, { status: 500 });
    }

    const body = await request.json();
    const { subdomain, tokenName, ticker, prompt, presaleWallet, telegram, twitter } = body;

    if (!subdomain || !tokenName || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = `You are an expert Web3 landing page developer. Generate a complete, standalone, highly engaging single-page HTML website for a meme coin in English.
Return ONLY raw valid HTML code without markdown formatting or markdown backticks (\`\`\`html).
Include modern CSS in a <style> tag.
Make the layout dark-themed, flashy, crypto-native, and responsive.
Include:
- Hero header with Token Name (${tokenName}) and Ticker (${ticker || 'MEME'})
- Engaging narrative based on the user prompt: "${prompt}"
- Presale box displaying the deposit wallet: "${presaleWallet || '0xYourWalletAddressHere'}" with a Copy button.
- Social buttons for Telegram (${telegram || '#'}) and Twitter (${twitter || '#'}).
- Disclaimer at footer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: fullPrompt,
    });

    let generatedHtml = response.text || '<h1>Error generating site HTML</h1>';
    generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, '').trim();

    const cleanSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    global.sitesDatabase[cleanSubdomain] = generatedHtml;

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
    console.error('API Catch Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
