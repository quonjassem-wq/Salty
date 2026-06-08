import React, { useState, useEffect, useRef } from 'react'

const DISCORD = 'https://discord.gg/yZyHEugsPF'

function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(iv)
      }, 40)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [text, delay])
  return <span>{displayed}<span style={{ animation: 'blink 1s infinite', color: 'var(--accent)' }}>|</span></span>
}

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem', maxWidth: '900px', width: '100%' }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '2.5rem',
          fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
          animation: 'fadeUp 0.6s ease forwards',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 8px #fbbf24', animation: 'glow-pulse 2s infinite', display: 'inline-block' }} />
          <span style={{ color: '#fbbf24', fontWeight: 600 }}>ALMOST RELEASED</span>
          <span style={{ color: 'var(--text3)', margin: '0 0.3rem' }}>|</span>
          <span style={{ color: 'var(--text2)' }}>100% UNC</span>
          <span style={{ color: 'var(--text3)', margin: '0 0.3rem' }}>·</span>
          <span style={{ color: 'var(--text2)' }}>98% sUNC</span>
          <span style={{ color: 'var(--text3)', margin: '0 0.3rem' }}>·</span>
          <span style={{ color: 'var(--text2)' }}>v0.0.1</span>
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1.05,
          marginBottom: '1.5rem', letterSpacing: '-0.02em',
          animation: 'fadeUp 0.7s 0.1s ease both',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #fff 0%, var(--accent2) 50%, var(--accent3) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite',
          }}>SALT</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--text2)', maxWidth: '600px',
          margin: '0 auto 1rem', lineHeight: 1.7, fontWeight: 400,
          animation: 'fadeUp 0.7s 0.2s ease both',
        }}>
          <TypewriterText text="The next generation application. Powerful. Clean. Free." delay={600} />
        </p>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)',
          marginBottom: '3rem', animation: 'fadeUp 0.7s 0.3s ease both',
          letterSpacing: '0.15em',
        }}>COMING SOON — 2026</p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.4s ease both',
        }}>
          <button onClick={() => setShowModal(true)} style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            color: '#fff', border: 'none', padding: '0.9rem 2.5rem',
            borderRadius: '10px', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-display)',
            boxShadow: '0 0 30px var(--glow)', letterSpacing: '0.05em',
            transition: 'transform 0.2s, box-shadow 0.2s',
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 0 50px var(--glow)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 30px var(--glow)' }}
          >
            ↓ DOWNLOAD SALT
          </button>

          <a href={DISCORD} target="_blank" rel="noreferrer" style={{
            background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)',
            padding: '0.9rem 2.5rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-display)', letterSpacing: '0.05em',
            transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent2)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.118 18.1.138 18.11a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            JOIN SALT
          </a>
        </div>
      </section>

      {/* Stats row */}
      <section style={{
        display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center',
        padding: '0 2rem 6rem', animation: 'fadeUp 0.7s 0.5s ease both',
      }}>
        {[
          { label: 'UNC', value: '100%', color: 'var(--green)' },
          { label: 'sUNC', value: '98%', color: 'var(--accent2)' },
          { label: 'STATUS', value: 'ALMOST', color: '#fbbf24' },
          { label: 'VERSION', value: 'v0.0.1', color: 'var(--accent3)' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '1.5rem 2rem', textAlign: 'center', minWidth: '130px',
            transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 0 20px ${s.color}40` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </section>

      {/* Download modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)', zIndex: 5000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px',
            padding: '3rem 3rem 2.5rem', maxWidth: '420px', width: '90%',
            textAlign: 'center', boxShadow: '0 0 80px var(--glow)',
            animation: 'fadeUp 0.3s ease',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem' }}>COMING SOON</h2>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Salt hasn't released yet! Join our Discord to get notified the moment it drops.
            </p>
            <a href={DISCORD} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #5865F2, #7289da)',
              color: '#fff', padding: '0.8rem 2rem', borderRadius: '8px',
              fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.118 18.1.138 18.11a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Join Discord
            </a>
            <br />
            <button onClick={() => setShowModal(false)} style={{
              background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginTop: '0.5rem',
            }}>close</button>
          </div>
        </div>
      )}
    </main>
  )
}
