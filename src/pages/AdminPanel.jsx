import React, { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno'

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `SALT-${seg()}-${seg()}-${seg()}`
}

function getKeys() {
  try { return JSON.parse(localStorage.getItem('salt-keys') || '{}') } catch { return {} }
}
function saveKeys(keys) {
  localStorage.setItem('salt-keys', JSON.stringify(keys))
}

const KEY_TYPES = [
  { id: 'day', label: '1 Day', duration: 86400000, price: 'Ads' },
  { id: 'week', label: '1 Week', duration: 604800000, price: '$2.99' },
  { id: 'month', label: '30 Days', duration: 2592000000, price: '$9.99' },
  { id: 'perm', label: 'Permanent', duration: Infinity, price: '$14.99' },
]

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [keys, setKeys] = useState({})
  const [keyType, setKeyType] = useState('day')
  const [count, setCount] = useState(1)
  const [generated, setGenerated] = useState([])
  const [copied, setCopied] = useState('')
  const [tab, setTab] = useState('generate')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (authed) setKeys(getKeys())
  }, [authed])

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setErr('') }
    else setErr('Invalid password')
  }

  const handleGenerate = () => {
    const current = getKeys()
    const now = Date.now()
    const type = KEY_TYPES.find(t => t.id === keyType)
    const newKeys = []
    for (let i = 0; i < Math.min(count, 50); i++) {
      const key = generateKey()
      current[key] = {
        type: keyType,
        created: now,
        expires: type.duration === Infinity ? 9999999999999 : now + type.duration,
        hwid: null,
      }
      newKeys.push(key)
    }
    saveKeys(current)
    setKeys({ ...current })
    setGenerated(newKeys)
  }

  const handleRevoke = (key) => {
    const current = getKeys()
    delete current[key]
    saveKeys(current)
    setKeys({ ...current })
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 1500)
  }

  const formatExpiry = (ts) => {
    if (!ts || ts >= 9999999999999) return 'Permanent'
    return new Date(ts).toLocaleString()
  }
  const isExpired = (ts) => ts < Date.now() && ts < 9999999999999

  const allKeys = Object.entries(keys).filter(([k]) => k.includes(search.toUpperCase()))

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '64px', zIndex: 1, position: 'relative' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '3rem', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 0 60px var(--glow)', animation: 'fadeUp 0.5s ease', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent3), transparent)' }} />
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.5rem' }}>Admin Access</h1>
          <p style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '2rem' }}>Hidden page — authorized only</p>
          <input
            type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Admin Password"
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.8rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', outline: 'none', marginBottom: '0.75rem', transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          {err && <p style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{err}</p>}
          <button onClick={handleLogin} style={{ width: '100%', background: 'linear-gradient(135deg, var(--accent), var(--accent3))', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1rem', boxShadow: '0 0 20px var(--glow)', transition: 'opacity 0.2s' }}>
            Enter
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 2rem 6rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', animation: 'fadeUp 0.5s ease' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>// admin panel</div>
            <h1 style={{ fontWeight: 800, fontSize: '2rem' }}>
              <span style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Salt Admin</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.5rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text3)' }}>Total Keys: </span>
              <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>{Object.keys(keys).length}</span>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.5rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text3)' }}>Active: </span>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>{Object.values(keys).filter(k => !isExpired(k.expires)).length}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', background: 'var(--surface)', padding: '0.35rem', borderRadius: '10px', border: '1px solid var(--border)', animation: 'fadeUp 0.5s 0.1s ease both' }}>
          {[{ id: 'generate', label: '⚡ Generate' }, { id: 'manage', label: '📋 Manage Keys' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, background: tab === t.id ? 'linear-gradient(135deg, var(--accent), var(--accent3))' : 'transparent',
              color: tab === t.id ? '#fff' : 'var(--text2)', border: 'none', padding: '0.65rem',
              borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: tab === t.id ? '0 0 15px var(--glow)' : 'none',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Generate Tab */}
        {tab === 'generate' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Key Type */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--text2)' }}>KEY TYPE</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {KEY_TYPES.map(t => (
                    <button key={t.id} onClick={() => setKeyType(t.id)} style={{
                      background: keyType === t.id ? 'var(--accent)' : 'var(--bg)',
                      border: `1px solid ${keyType === t.id ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: '8px', padding: '0.65rem 1rem',
                      color: keyType === t.id ? '#fff' : 'var(--text)',
                      cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.15s', fontSize: '0.9rem',
                    }}>
                      <span>{t.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.8 }}>{t.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Count & Generate */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent3), transparent)' }} />
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--text2)' }}>QUANTITY</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <button onClick={() => setCount(c => Math.max(1, c - 1))} style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>−</button>
                  <input type="number" value={count} min={1} max={50}
                    onChange={e => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                    style={{ width: '80px', textAlign: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.5rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none' }}
                  />
                  <button onClick={() => setCount(c => Math.min(50, c + 1))} style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>+</button>
                </div>
                <button onClick={handleGenerate} style={{
                  width: '100%', background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
                  color: '#fff', border: 'none', padding: '0.9rem', borderRadius: '10px',
                  fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1rem',
                  boxShadow: '0 0 20px var(--glow)', transition: 'all 0.2s', letterSpacing: '0.05em',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >⚡ Generate {count} Key{count !== 1 ? 's' : ''}</button>
              </div>
            </div>

            {/* Generated output */}
            {generated.length > 0 && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--accent)', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 0 25px var(--glow)', animation: 'fadeUp 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: 700, color: 'var(--accent2)' }}>Generated Keys ({generated.length})</h3>
                  <button onClick={() => handleCopy(generated.join('\n'))} style={{
                    background: 'var(--accent)', color: '#fff', border: 'none', padding: '0.4rem 0.9rem',
                    borderRadius: '6px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  }}>{copied === generated.join('\n') ? '✓ Copied!' : 'Copy All'}</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '300px', overflowY: 'auto' }}>
                  {generated.map(k => (
                    <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg)', borderRadius: '8px', padding: '0.6rem 1rem', border: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent2)' }}>{k}</span>
                      <button onClick={() => handleCopy(k)} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text2)', padding: '0.2rem 0.6rem', borderRadius: '5px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', flexShrink: 0 }}>
                        {copied === k ? '✓' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manage Tab */}
        {tab === 'manage' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search keys..."
              style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.8rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {allKeys.length === 0 && <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>No keys found</p>}
              {allKeys.map(([k, v]) => {
                const expired = isExpired(v.expires)
                return (
                  <div key={k} style={{
                    background: 'var(--surface)', border: `1px solid ${expired ? 'var(--border)' : 'var(--border)'}`,
                    borderRadius: '10px', padding: '0.9rem 1.2rem',
                    display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
                    opacity: expired ? 0.5 : 1, transition: 'all 0.15s',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: expired ? 'var(--text3)' : 'var(--accent2)', flex: 1, minWidth: '200px' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', minWidth: '60px' }}>{v.type?.toUpperCase()}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: expired ? 'var(--red)' : 'var(--green)' }}>
                      {expired ? 'EXPIRED' : formatExpiry(v.expires)}
                    </span>
                    <button onClick={() => handleRevoke(k)} style={{
                      background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                      color: 'var(--red)', padding: '0.3rem 0.7rem', borderRadius: '6px', cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem', flexShrink: 0,
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                    >Revoke</button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
