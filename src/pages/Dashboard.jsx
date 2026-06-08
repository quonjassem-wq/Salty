import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

// Simulated key store (in production this would be server-side)
// Keys are stored in localStorage for demo purposes
function checkKey(key) {
  try {
    const keys = JSON.parse(localStorage.getItem('salt-keys') || '{}')
    const entry = keys[key]
    if (!entry) return { valid: false, reason: 'Key not found' }
    if (Date.now() > entry.expires) return { valid: false, reason: 'Key has expired' }
    return { valid: true, type: entry.type, expires: entry.expires }
  } catch {
    return { valid: false, reason: 'Error checking key' }
  }
}

export default function Dashboard() {
  const { user, login, logout } = useAuth()
  const [key, setKey] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loginMode, setLoginMode] = useState(false)
  const [loginKey, setLoginKey] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginErr, setLoginErr] = useState('')

  const handleCheck = () => {
    if (!key.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const res = checkKey(key.trim().toUpperCase())
      setResult(res)
      setLoading(false)
    }, 800)
  }

  const handleLogin = () => {
    if (!loginKey.trim() || !loginUsername.trim() || !loginPass.trim()) {
      setLoginErr('All fields required'); return
    }
    const res = checkKey(loginKey.trim().toUpperCase())
    if (!res.valid) { setLoginErr('Invalid or expired key'); return }
    login({ username: loginUsername, password: loginPass, key: loginKey.trim().toUpperCase(), keyType: res.type, keyExpires: res.expires })
    setLoginErr('')
  }

  const formatExpiry = (ts) => {
    if (!ts || ts === Infinity || ts > 9999999999999) return 'Permanent'
    return new Date(ts).toLocaleString()
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem 6rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeUp 0.7s ease both' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>// dashboard</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
            Key{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dashboard
            </span>
          </h1>
          <p style={{ color: 'var(--text2)' }}>Check your key status or log in with your key.</p>
        </div>

        {/* If logged in — show profile */}
        {user ? (
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--accent)', borderRadius: '16px',
              padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 0 30px var(--glow)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{
                  width: 70, height: 70, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', fontWeight: 800, flexShrink: 0,
                  boxShadow: '0 0 20px var(--glow)',
                }}>{user.username?.[0]?.toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.2rem' }}>{user.username}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent2)' }}>
                    KEY: {user.key}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', marginTop: '0.2rem' }}>
                    {user.keyType?.toUpperCase()} · Expires: {formatExpiry(user.keyExpires)}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                    borderRadius: '100px', padding: '0.3rem 0.8rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--green)',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                    ACTIVE
                  </div>
                </div>
              </div>
            </div>
            <button onClick={logout} style={{
              background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text2)',
              padding: '0.7rem 1.5rem', borderRadius: '8px', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem',
              transition: 'all 0.2s', width: '100%',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
            >Sign Out</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeUp 0.5s ease both' }}>
            {/* Key checker */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--accent2)' }}>🔑 Check Key Status</h2>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  value={key}
                  onChange={e => setKey(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCheck()}
                  placeholder="SALT-XXXX-XXXX-XXXX"
                  style={{
                    flex: 1, minWidth: '200px', background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--text)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.9rem', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button onClick={handleCheck} disabled={loading} style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                  color: '#fff', border: 'none', padding: '0.75rem 1.5rem',
                  borderRadius: '8px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontSize: '0.9rem',
                  transition: 'opacity 0.2s', opacity: loading ? 0.6 : 1,
                }}>
                  {loading ? '...' : 'Check'}
                </button>
              </div>

              {result && (
                <div style={{
                  marginTop: '1rem', padding: '1rem',
                  background: result.valid ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                  border: `1px solid ${result.valid ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                  borderRadius: '8px', animation: 'fadeUp 0.3s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: result.valid ? '0.5rem' : 0 }}>
                    <span style={{ fontSize: '1.2rem' }}>{result.valid ? '✅' : '❌'}</span>
                    <span style={{ fontWeight: 700, color: result.valid ? 'var(--green)' : 'var(--red)', fontFamily: 'var(--font-mono)' }}>
                      {result.valid ? 'KEY IS VALID' : `INVALID — ${result.reason}`}
                    </span>
                  </div>
                  {result.valid && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text3)' }}>
                      Type: {result.type?.toUpperCase()} · Expires: {formatExpiry(result.expires)}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Login with key */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent3), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent3)' }}>👤 Login with Key</h2>
                <button onClick={() => setLoginMode(m => !m)} style={{
                  background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text2)',
                  padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                }}>{loginMode ? 'Hide' : 'Show'}</button>
              </div>
              {loginMode && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeUp 0.3s ease' }}>
                  {[
                    { val: loginKey, set: setLoginKey, placeholder: 'Your Key (SALT-XXXX-XXXX)', type: 'text' },
                    { val: loginUsername, set: setLoginUsername, placeholder: 'Username', type: 'text' },
                    { val: loginPass, set: setLoginPass, placeholder: 'Password', type: 'password' },
                  ].map((f, i) => (
                    <input key={i} value={f.val} type={f.type}
                      onChange={e => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      style={{
                        background: 'var(--bg)', border: '1px solid var(--border)',
                        borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--text)',
                        fontFamily: 'var(--font-mono)', fontSize: '0.9rem', outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent3)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  ))}
                  {loginErr && <p style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{loginErr}</p>}
                  <button onClick={handleLogin} style={{
                    background: 'linear-gradient(135deg, var(--accent3), var(--accent))',
                    color: '#fff', border: 'none', padding: '0.8rem',
                    borderRadius: '8px', fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                    transition: 'opacity 0.2s',
                  }}>
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
