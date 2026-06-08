import React, { useEffect, useRef } from 'react'

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized core for maximum performance and minimal latency.' },
  { icon: '🔒', title: 'Secure', desc: 'Built with security in mind. Your data stays yours.' },
  { icon: '🆓', title: 'Free Forever', desc: 'Salt is free with ads. No hidden costs, ever.' },
  { icon: '🛡️', title: 'Always Updated', desc: 'The Salt team pushes updates constantly to stay ahead.' },
  { icon: '🌐', title: 'Multi Instance', desc: 'Supports multiple instances running simultaneously.' },
  { icon: '💎', title: 'Premium Keys', desc: 'Unlock extended access with affordable premium key tiers.' },
]

export default function About() {
  const itemsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = '1', e.target.style.transform = 'translateY(0)' }),
      { threshold: 0.1 }
    )
    itemsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem', animation: 'fadeUp 0.7s ease both' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)',
            letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem',
          }}>// about</span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem',
          }}>
            What is{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent2), var(--accent3))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Salt?</span>
          </h1>
          <p style={{
            color: 'var(--text2)', fontSize: '1.15rem', maxWidth: '600px',
            margin: '0 auto', lineHeight: 1.8,
          }}>
            Salt is a cutting-edge application built for power users. Designed from the ground up to be fast, reliable, and free — with optional premium access for those who want more.
          </p>
        </div>

        {/* Highlight block */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px',
          padding: '2.5rem', marginBottom: '4rem', position: 'relative', overflow: 'hidden',
          animation: 'fadeUp 0.7s 0.15s ease both',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)',
          }} />
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)',
            letterSpacing: '0.15em', marginBottom: '1rem',
          }}>MISSION STATEMENT</div>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text)', fontWeight: 500 }}>
            "We believe powerful tools shouldn't be locked behind paywalls. Salt was born to give everyone access to a top-tier experience — completely free, forever."
          </p>
          <div style={{ marginTop: '1rem', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            — The Salt Team
          </div>
        </div>

        {/* Feature grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem',
        }}>
          {features.map((f, i) => (
            <div key={f.title} ref={el => itemsRef.current[i] = el} style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
              padding: '1.75rem', opacity: 0, transform: 'translateY(20px)',
              transition: `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease, border-color 0.2s, box-shadow 0.2s`,
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 25px var(--glow)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Version badge */}
        <div style={{
          marginTop: '4rem', textAlign: 'center',
          fontFamily: 'var(--font-mono)', color: 'var(--text3)', fontSize: '0.8rem',
        }}>
          Current build: <span style={{ color: 'var(--accent2)' }}>v0.0.1</span> · 2026 · COMING SOON
        </div>
      </div>
    </main>
  )
}
