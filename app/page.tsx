import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#09090b', color: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #27272a', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#eab308', letterSpacing: '-1px' }}>DJANGO ⚡</h1>
        <Link href="/create" style={{ background: '#eab308', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
          Launch Website
        </Link>
      </header>

      <main style={{ maxWidth: '900px', margin: '80px auto 0', textAlign: 'center', padding: '0 20px' }}>
        <div style={{ display: 'inline-block', background: '#27272a', color: '#eab308', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '20px' }}>
          AI-Powered Meme Token Landing Page Generator
        </div>
        
        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: '1.1', marginBottom: '24px' }}>
          Unleash Your Meme Coin Website in Seconds.
        </h2>
        
        <p style={{ fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
          Describe your token vision. Our AI generates a custom, high-converting HTML landing page with direct Web3 presale integration for just <span style={{ color: '#fff', fontWeight: 'bold' }}>$10 USDT</span>.
        </p>

        <Link href="/create" style={{ background: '#eab308', color: '#000', padding: '18px 45px', borderRadius: '12px', fontWeight: 900, fontSize: '1.25rem', textDecoration: 'none', display: 'inline-block', boxShadow: '0 0 25px rgba(234, 179, 8, 0.3)' }}>
          Create Your Website Now ($10 USDT) 🔥
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '80px', textAlign: 'left' }}>
          <div style={{ background: '#18181b', padding: '24px', borderRadius: '12px', border: '1px solid #27272a' }}>
            <h3 style={{ color: '#eab308', marginBottom: '10px' }}>🤖 AI Web Generation</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem' }}>AI crafts complete HTML structure, styles, and copy based on your token prompt.</p>
          </div>
          <div style={{ background: '#18181b', padding: '24px', borderRadius: '12px', border: '1px solid #27272a' }}>
            <h3 style={{ color: '#eab308', marginBottom: '10px' }}>⚡ Instant Subdomain</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem' }}>Your page is instantly published to a unique subdomain with zero hosting setup.</p>
          </div>
          <div style={{ background: '#18181b', padding: '24px', borderRadius: '12px', border: '1px solid #27272a' }}>
            <h3 style={{ color: '#eab308', marginBottom: '10px' }}>💳 Crypto Checkout</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem' }}>Pay seamlessly using MetaMask or any Web3 wallet in USDT/ETH.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
