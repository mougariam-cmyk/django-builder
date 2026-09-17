'use client';

import { useState } from 'react';

export default function CreateWebsitePage() {
  const [siteName, setSiteName] = useState('');
  const [sitePrompt, setSitePrompt] = useState('');
  const [templateStyle, setTemplateStyle] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerateWebsite = async () => {
    if (!siteName || !sitePrompt) {
      alert('Please fill in the website name and description.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-and-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subdomain: siteName.toLowerCase().replace(/\s+/g, '-'),
          tokenName: siteName,
          ticker: 'SITE',
          prompt: sitePrompt,
          template: templateStyle
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Error generating website.');
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#fff', padding: '40px', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* تأثير خلفية إبداعي وعصري */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(9, 9, 11, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ maxWidth: '650px', margin: '0 auto', background: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid #27272a', position: 'relative', zIndex: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '26px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎨</span> Django Web Builder
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '13px', margin: '5px 0 0 0' }}>Transform your vision into a masterpiece website using AI.</p>
        </div>
        
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Website Name / Subdomain:</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="e.g. my-awesome-portfolio"
            style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', color: '#fff', padding: '12px', borderRadius: '6px', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Template Style:</label>
          <select
            value={templateStyle}
            onChange={(e) => setTemplateStyle(e.target.value)}
            style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', color: '#fff', padding: '12px', borderRadius: '6px', outline: 'none' }}
          >
            <option value="modern">Modern & Minimalist</option>
            <option value="creative">Creative & Artistic (Masterpiece)</option>
            <option value="business">Professional Business</option>
          </select>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Describe your Website Idea & Content:</label>
          <textarea
            value={sitePrompt}
            onChange={(e) => setSitePrompt(e.target.value)}
            placeholder="Describe how you want your website to look, sections, colors, and vibe..."
            style={{ width: '100%', height: '110px', background: '#09090b', border: '1px solid #3f3f46', color: '#fff', padding: '12px', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <button
          onClick={handleGenerateWebsite}
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', transition: 'opacity 0.2s' }}
        >
          {loading ? '✨ Crafting your masterpiece website...' : '🚀 Generate Website'}
        </button>

        {result && (
          <div style={{ marginTop: '20px', background: '#27272a', padding: '20px', borderRadius: '6px', border: '1px solid #3f3f46', textAlign: 'center' }}>
            <h3 style={{ color: '#4ade80', marginBottom: '8px', fontSize: '16px' }}>✨ Website Generated Successfully!</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#d4d4d8' }}>Your website has been successfully built and saved.</p>
            
            {result.siteUrl && (
              <a 
                href={result.siteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#eab308',
                  color: '#000',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)'
                }}
              >
                🌐 Browse Website (Preview)
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
