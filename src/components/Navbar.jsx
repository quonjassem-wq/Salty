import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/help', label: 'Help' },
  { to: '/credits', label: 'Credits' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/settings', label: 'Settings' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(8,8,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 800,
            boxShadow: '0 0 20px var(--glow)',
            animation: 'glow-pulse 3s ease infinite',
          }}>S</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem',
            background: 'linear-gradient(90deg, var(--accent2), var(--accent3))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em',
          }}>SALT</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text3)',
            background: 'var(--surface)', padding: '2px 6px', borderRadius: '4px',
            border: '1px solid var(--border)',
          }}>v0.0.1</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: pathname === l.to ? 'var(--accent2)' : 'var(--text2)',
              background: pathname === l.to ? 'var(--surface)' : 'transparent',
              border: pathname === l.to ? '1px solid var(--border)' : '1px solid transparent',
              transition: 'all 0.2s',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => { if(pathname !== l.to) e.target.style.color = 'var(--text)' }}
            onMouseLeave={e => { if(pathname !== l.to) e.target.style.color = 'var(--text2)' }}
            >{l.label}</Link>
          ))}
          {user && (
            <div style={{
              marginLeft: '0.5rem', width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              border: '2px solid var(--accent)',
            }}>{user.username?.[0]?.toUpperCase() || 'U'}</div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          display: 'none', background: 'none', border: 'none', color: 'var(--text)',
          fontSize: '1.5rem', cursor: 'pointer',
        }} className="nav-mobile-btn">☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--bg2)', borderTop: '1px solid var(--border)',
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600,
              color: pathname === l.to ? 'var(--accent2)' : 'var(--text2)',
              background: pathname === l.to ? 'var(--surface)' : 'transparent',
            }}>{l.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
