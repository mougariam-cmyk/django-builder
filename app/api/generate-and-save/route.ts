import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing' }, { status: 500 });
    }

    const body = await request.json();
    const { subdomain, tokenName, ticker, prompt, presaleWallet } = body;

    if (!subdomain || !tokenName || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

    // توليد كود الـ HTML عبر الذكاء الاصطناعي
    const systemInstruction = `You are an expert Web3 landing page developer. Generate a complete, standalone, highly engaging single-page HTML website for a meme coin in English. Return ONLY raw valid HTML code without markdown formatting or markdown backticks. Include modern CSS in a <style> tag. Make the layout dark-themed, flashy, crypto-native, and responsive. Include: Hero header with Token Name (${tokenName}) and Ticker (${ticker || 'MEME'}), engaging narrative based on prompt: "${prompt}", presale box with wallet: "${presaleWallet || '0xYourWallet'}", and social links.`;

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

    let generatedHtml = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, '').trim();

    // حفظ الموقع بشكل دائم في قاعدة البيانات Supabase
    const { error: dbError } = await supabase
      .from('sites')
      .upsert([{ subdomain: cleanSubdomain, html_code: generatedHtml, token_name: tokenName }]);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // بناء الرابط الحقيقي والدائم
    const hostHeader = request.headers.get('host') || 'localhost:3000';
    const protocol = hostHeader.includes('localhost') ? 'http' : 'https';
    const siteUrl = `${protocol}://${hostHeader}/site/${cleanSubdomain}`;

    return NextResponse.json({ 
      success: true, 
      siteUrl, 
      tokenName, 
      subdomain: cleanSubdomain 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
