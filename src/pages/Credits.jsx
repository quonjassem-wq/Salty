import React, { useEffect, useRef } from 'react'

const team = [
  {
    name: 'Salt',
    role: 'Owner',
    tag: '~ Salt',
    img: '/image1.png',
    color: 'var(--accent)',
    desc: 'Founder and lead developer of Salt. Responsible for the core architecture and vision.',
    badge: '👑 OWNER',
  },
  {
    name: 'Sugar',
    role: 'Co-Owner',
    tag: '~ Sugar',
    img: '/image2.png',
    color: 'var(--accent3)',
    desc: 'Co-founder and key contributor. Handles operations, community, and development support.',
    badge: '⭐ CO-OWNER',
  },
]

export default function Credits() {
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0) scale(1)'
        }
      }),
      { threshold: 0.1 }
    )
    cardsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem', animation: 'fadeUp 0.7s ease both' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)',
            letterSpacing: '0.2em', display: 'block', marginBottom: '1rem',
          }}>// credits</span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem',
          }}>
            The{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent2), var(--accent3))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Salt Team</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            The people who built Salt from scratch and continue to push it forward.
          </p>
        </div>

        {/* Team cards */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
          {team.map((member, i) => (
            <div key={member.name} ref={el => cardsRef.current[i] = el} style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px',
              padding: '2.5rem 2rem', width: '340px', maxWidth: '100%',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              opacity: 0, transform: 'translateY(40px) scale(0.96)',
              transition: `opacity 0.7s ${i * 0.15}s ease, transform 0.7s ${i * 0.15}s ease, border-color 0.3s, box-shadow 0.3s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = member.color
              e.currentTarget.style.boxShadow = `0 0 40px ${member.color}50`
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
            }}
            >
              {/* Top gradient line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
              }} />

              {/* Glow bg */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px', height: '200px', borderRadius: '50%',
                background: `radial-gradient(circle, ${member.color}15, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Avatar */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 110, height: 110, borderRadius: '50%', overflow: 'hidden',
                  border: `3px solid ${member.color}`,
                  boxShadow: `0 0 25px ${member.color}60`,
                  margin: '0 auto',
                  background: 'var(--surface2)',
                  animation: 'float 5s ease infinite',
                  animationDelay: `${i * 0.8}s`,
                }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:800;color:${member.color};font-family:var(--font-display)">${member.name[0]}</div>`
                    }}
                  />
                </div>
                {/* Spinning ring */}
                <div style={{
                  position: 'absolute', inset: '-6px', borderRadius: '50%',
                  border: `1px dashed ${member.color}60`,
                  animation: 'spin-slow 8s linear infinite',
                }} />
              </div>

              {/* Badge */}
              <div style={{
                display: 'inline-block', background: `${member.color}20`,
                border: `1px solid ${member.color}60`, borderRadius: '100px',
                padding: '0.2rem 0.8rem', fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)', color: member.color,
                marginBottom: '0.75rem', letterSpacing: '0.08em',
              }}>{member.badge}</div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.2rem' }}>
                {member.name}
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', color: member.color, fontSize: '0.85rem', marginBottom: '1rem' }}>
                {member.tag}
              </p>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {member.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          textAlign: 'center', padding: '2rem',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
          animation: 'fadeUp 0.7s 0.4s ease both',
        }}>
          <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Built with ❤️ by the Salt team · 2026 ·{' '}
            <a href="https://discord.gg/yZyHEugsPF" target="_blank" rel="noreferrer" style={{ color: 'var(--accent2)' }}>
              Join our Discord
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
