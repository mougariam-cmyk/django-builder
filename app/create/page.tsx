'use client';

import { useState } from 'react';

export default function CreatePage() {
  const [prompt, setPrompt] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // عناوين محافظ Bitget الحقيقية الخاصة بك للاستقبال
  const EVM_WALLET = "0x69316e83C60270C56A599d67521D4baa99a23bEC"; // Ethereum & BNB
  const SOL_WALLET = "HtdwqqhDeqVKxXZabcoas9mof1DFhPDFPyhyz8SAj84t"; // Solana
  const ARC_USDC_WALLET = "0x69316e83C60270C56A599d67521D4baa99a23bEC"; // ARC Network (USDC)

  const handleConnectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setUserWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (err) {
        alert('Connection rejected by user.');
      }
    } else {
      const simulatedWallet = prompt("Enter your wallet address manually or use Trust/Binance Wallet via DApp browser:", "0x...");
      if (simulatedWallet) {
        setUserWalletAddress(simulatedWallet);
        setWalletConnected(true);
      }
    }
  };

  const handleGenerate = async (paymentMethod: string) => {
    if (!tokenName || !prompt) {
      alert('Please fill in token name and description.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-and-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          tokenName, 
          hasLogo: !!logoFile, 
          paymentMethod,
          userWallet: userWalletAddress 
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Error generating landing page');
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#fff', padding: '40px', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* تأثير توهج خلفية المنصة */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(9, 9, 11, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ maxWidth: '650px', margin: '0 auto', background: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid #27272a', position: 'relative', zIndex: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚀</span> Django Web3 Builder
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: '5px 0 0 0' }}>AI-powered crypto presale & landing page platform.</p>
          </div>
          <button
            onClick={handleConnectWallet}
            style={{ padding: '9px 14px', background: walletConnected ? '#10b981' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {walletConnected ? `✅ ${userWalletAddress.substring(0, 6)}...` : '🔗 Connect Wallet'}
          </button>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Token Name & Symbol:</label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="e.g. HIPPO / LOOFY"
            style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', color: '#fff', padding: '10px', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Upload Coin Logo (for generated site):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setLogoFile(e.target.files[0])}
            style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', color: '#a1a1aa', padding: '8px', borderRadius: '6px' }}
          />
          {logoFile && <p style={{ color: '#4ade80', fontSize: '12px', marginTop: '4px' }}>Logo Selected: {logoFile.name}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Describe your Token / Project:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A revolutionary meme coin on Sui / EVM..."
            style={{ width: '100%', height: '80px', background: '#09090b', border: '1px solid #3f3f46', color: '#fff', padding: '10px', borderRadius: '6px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>Choose crypto payment to launch ($10 fee):</p>
          
          <button
            onClick={() => handleGenerate('crypto_evm_sol')}
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Processing...' : '💎 Pay $10 via EVM / Solana Wallets'}
          </button>

          <button
            onClick={() => handleGenerate('crypto_arc_usdc')}
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🚀 Pay $10 via ARC Network (USDC)
          </button>
        </div>

        <div style={{ borderTop: '1px solid #27272a', paddingTop: '15px', fontSize: '12px', color: '#a1a1aa' }}>
          <p style={{ margin: '0 0 5px 0' }}><strong>Your Active Bitget Receiver Wallets:</strong></p>
          <p style={{ margin: '2px 0' }}>• ETH / BNB: <code style={{ color: '#38bdf8' }}>{EVM_WALLET}</code></p>
          <p style={{ margin: '2px 0' }}>• Solana: <code style={{ color: '#38bdf8' }}>{SOL_WALLET}</code></p>
          <p style={{ margin: '2px 0' }}>• ARC Network (USDC): <code style={{ color: '#38bdf8' }}>{ARC_USDC_WALLET}</code></p>
        </div>

        {result && (
          <div style={{ marginTop: '20px', background: '#27272a', padding: '15px', borderRadius: '6px' }}>
            <h3 style={{ color: '#4ade80', marginBottom: '5px' }}>Success!</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>{result.message || 'Your crypto presale page has been successfully built!'}</p>
          </div>
        )}
      </div>
    </main>
  );
}
