import React from 'react'

export default function Help() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem', animation: 'fadeUp 0.7s ease both' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'float 4s ease infinite' }}>🔧</div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>// help</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1rem' }}>
          <span style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            COMING SOON
          </span>
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 2rem' }}>
          The help center is being built. In the meantime, get full support in our Discord server.
        </p>
        <a href="https://discord.gg/yZyHEugsPF" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          background: '#5865F2', color: '#fff', padding: '0.9rem 2.2rem',
          borderRadius: '10px', fontWeight: 700, fontSize: '1rem',
          fontFamily: 'var(--font-display)', letterSpacing: '0.04em',
          transition: 'transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 0 25px rgba(88,101,242,0.4)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(88,101,242,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 25px rgba(88,101,242,0.4)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.118 18.1.138 18.11a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          Get Help in Discord
        </a>
      </div>
    </main>
  )
}
