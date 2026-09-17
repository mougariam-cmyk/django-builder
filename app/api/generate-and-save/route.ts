import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing in environment variables' }, { status: 500 });
    }

    const body = await request.json();
    const { subdomain, tokenName, ticker, prompt, presaleWallet, telegram, twitter } = body;

    if (!subdomain || !tokenName || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const systemInstruction = `You are an expert Web3 landing page developer. Generate a complete, standalone, highly engaging single-page HTML website for a meme coin in English. Return ONLY raw valid HTML code without markdown formatting or markdown backticks. Include modern CSS in a <style> tag. Make the layout dark-themed, flashy, crypto-native, and responsive. Include: Hero header with Token Name (${tokenName}) and Ticker (${ticker || 'MEME'}), engaging narrative based on prompt: "${prompt}", presale box with wallet: "${presaleWallet || '0xYourWallet'}", social links, and footer disclaimer.`;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemInstruction}\n\nUser Request: ${prompt}` }] }]
      })
    });

    const geminiData = await geminiRes.json();
    
    if (!geminiRes.ok) {
      return NextResponse.json({ error: geminiData.error?.message || 'Gemini API Error' }, { status: 500 });
    }

    let generatedHtml = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '<h1>Error generating site HTML</h1>';
    generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, '').trim();

    // إرجاع كود الـ HTML الحقيقي مباشرة مع تفاصيل الموقع ليعرضه المتصفح فوراً دون مشاكل الـ Serverless
    return NextResponse.json({ 
      success: true, 
      htmlCode: generatedHtml,
      tokenName, 
      ticker, 
      subdomain 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
