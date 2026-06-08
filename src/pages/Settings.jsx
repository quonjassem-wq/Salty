import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const themes = [
  { id: 'dark', label: 'Dark', preview: ['#080810', '#7b6ff0', '#38bdf8'] },
  { id: 'light', label: 'Light', preview: ['#f4f3ff', '#6d5cf0', '#0ea5e9'] },
  { id: 'red', label: 'Crimson', preview: ['#0f0808', '#ef4444', '#fb923c'] },
  { id: 'cyan', label: 'Oceanic', preview: ['#020f14', '#06b6d4', '#a78bfa'] },
]

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { user, updateProfile, logout } = useAuth()
  const [username, setUsername] = useState(user?.username || '')
  const [password, setPassword] = useState('')
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('theme')

  const handleSave = () => {
    if (!user) return
    updateProfile({ username: username || user.username, ...(password ? { password } : {}) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setPassword('')
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem 6rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeUp 0.7s ease both' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>// settings</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Settings</span>
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'var(--surface)', padding: '0.4rem', borderRadius: '10px', border: '1px solid var(--border)', animation: 'fadeUp 0.5s 0.1s ease both' }}>
          {[
            { id: 'theme', label: '🎨 Theme' },
            { id: 'account', label: '👤 Account' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text2)',
              border: 'none', padding: '0.6rem', borderRadius: '7px',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: activeTab === tab.id ? '0 0 15px var(--glow)' : 'none',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)' }} />
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text)' }}>Choose Theme</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {themes.map(t => (
                  <button key={t.id} onClick={() => setTheme(t.id)} style={{
                    background: t.id === theme ? 'var(--surface2)' : 'var(--bg)',
                    border: `2px solid ${t.id === theme ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px', padding: '1.25rem', cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.2s',
                    boxShadow: t.id === theme ? '0 0 20px var(--glow)' : 'none',
                  }}
                  onMouseEnter={e => { if (t.id !== theme) e.currentTarget.style.borderColor = 'var(--text3)' }}
                  onMouseLeave={e => { if (t.id !== theme) e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                      {t.preview.map((c, i) => (
                        <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}80` }} />
                      ))}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>{t.label}</div>
                    {t.id === theme && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', marginTop: '0.2rem' }}>● ACTIVE</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            {user ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent3), transparent)' }} />
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text)' }}>Edit Profile</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '1.3rem', flexShrink: 0,
                  }}>{user.username?.[0]?.toUpperCase()}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{user.username}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent2)' }}>{user.key}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>USERNAME</label>
                    <input value={username} onChange={e => setUsername(e.target.value)}
                      style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>NEW PASSWORD</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank to keep current"
                      style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={handleSave} style={{
                      flex: 1, background: saved ? 'var(--green)' : 'linear-gradient(135deg, var(--accent), var(--accent3))',
                      color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '8px',
                      fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s',
                    }}>{saved ? '✓ Saved!' : 'Save Changes'}</button>
                    <button onClick={logout} style={{
                      background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--red)',
                      padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer',
                      fontFamily: 'var(--font-display)', fontWeight: 600, transition: 'all 0.2s',
                    }}>Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px',
                padding: '3rem', textAlign: 'center',
              }}>
                <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>You need to log in first to manage your account.</p>
                <a href="/dashboard" style={{
                  display: 'inline-block', background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                  color: '#fff', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                }}>Go to Dashboard</a>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
