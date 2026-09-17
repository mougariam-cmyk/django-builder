'use client';
import { useState } from 'react';

export default function CreatePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // عناوين محافظك الحقيقية للاستقبال
  const EVM_WALLET = "0x69316e83C60270C56A599d67521D4baa99a23bEC"; // Ethereum & BNB
  const SOL_WALLET = "HtdwqqhDeqVKxXZabcoas9mof1DFhPDFPyhyz8SAj84t"; // Solana

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-and-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Error generating page');
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#fff', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid #27272a' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>🚀 Django Web3 Builder</h1>
        <p style={{ color: '#a1a1aa', marginBottom: '20px' }}>Create your AI-powered landing page & crypto presale platform.</p>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Describe your Token / Project:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A revolutionary meme coin on Sui / Ethereum..."
            style={{ width: '100%', height: '100px', background: '#09090b', border: '1px solid #3f3f46', color: '#fff', padding: '10px', borderRadius: '6px' }}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Generating with AI...' : 'Generate Landing Page ($10 Presale Flow)'}
        </button>

        <div style={{ marginTop: '30px', borderTop: '1px solid #27272a', paddingTop: '20px', fontSize: '13px', color: '#a1a1aa' }}>
          <p><strong>Receiver Wallets Configured:</strong></p>
          <p>• ETH / BNB: <code style={{ color: '#38bdf8' }}>{EVM_WALLET}</code></p>
          <p>• Solana: <code style={{ color: '#38bdf8' }}>{SOL_WALLET}</code></p>
        </div>

        {result && (
          <div style={{ marginTop: '20px', background: '#27272a', padding: '15px', borderRadius: '6px' }}>
            <h3 style={{ color: '#4ade80', marginBottom: '5px' }}>Success!</h3>
            <p>{result.message || 'Page generated successfully.'}</p>
          </div>
        )}
      </div>
    </main>
  );
}
