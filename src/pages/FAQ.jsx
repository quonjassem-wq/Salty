import React, { useState, useEffect, useRef } from 'react'

function useTypewriter(text, active) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return }
    setDisplayed('')
    setDone(false)
    let i = 0
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, 18)
    return () => clearInterval(iv)
  }, [text, active])

  return { displayed, done }
}

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const { displayed, done } = useTypewriter(a, open)

  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden',
      marginBottom: '0.75rem',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      animation: `fadeUp 0.5s ${index * 0.06}s ease both`,
      ...(open ? { borderColor: 'var(--accent)', boxShadow: '0 0 20px var(--glow)' } : {}),
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: open ? 'var(--surface)' : 'var(--surface)',
        border: 'none', padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '1rem', color: open ? 'var(--accent2)' : 'var(--text)', textAlign: 'left',
        transition: 'color 0.2s',
      }}>
        <span>{q}</span>
        <span style={{
          flexShrink: 0, width: 24, height: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'var(--accent)' : 'var(--surface2)',
          borderRadius: '50%', fontSize: '0.75rem', color: open ? '#fff' : 'var(--text3)',
          transition: 'all 0.3s', transform: open ? 'rotate(45deg)' : 'none',
          border: '1px solid var(--border)',
        }}>+</span>
      </button>

      {open && (
        <div style={{
          padding: '0 1.5rem 1.5rem',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          paddingTop: '1rem',
        }}>
          <p style={{
            color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
          }}>
            {displayed}
            {!done && <span style={{ animation: 'blink 0.7s infinite', color: 'var(--accent)' }}>▋</span>}
          </p>
        </div>
      )}
    </div>
  )
}

const faqs = [
  { q: 'Is Salt Paid?', a: 'Salt is going to be forever free with ads. You will always have access at no cost.' },
  { q: 'Is Salt Keyless?', a: 'No, Salt has a key system. You will need a key to use the application.' },
  { q: 'When will Salt Release?', a: 'Salt is planned to release around May 28–29. Stay tuned to our Discord for the exact announcement.' },
  { q: 'What are the Salt Paid Key Prices?', a: '1 Day = Free with Ads\n1 Week = $2.99\n30 Days = $9.99\nPermanent Key = $14.99' },
  { q: 'Does Salt support Multi Instance?', a: 'Currently it is working well since the last test. Multi instance support is active.' },
  { q: 'Is Salt undetected?', a: 'The Salt Team is trying their best to bypass client modification bans. However, just in case, use an alt account — there is a risk during ban waves.' },
  { q: 'Where can I get more help?', a: 'More questions are answered in our Discord server! Join at discord.gg/yZyHEugsPF' },
]

export default function FAQ() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 2rem 6rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeUp 0.7s ease both' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)',
            letterSpacing: '0.2em', display: 'block', marginBottom: '1rem',
          }}>// faq</span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            Frequently Asked{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent2), var(--accent3))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Questions</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '1rem', lineHeight: 1.7 }}>
            Click any question to reveal the answer. More help in our Discord.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem',
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '100px',
            padding: '0.3rem 0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--yellow)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block', animation: 'glow-pulse 2s infinite' }} />
            Salt has not released yet — check Discord for updates
          </div>
        </div>

        {faqs.map((f, i) => (
          <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
        ))}

        <div style={{
          marginTop: '3rem', textAlign: 'center', padding: '2rem',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
          animation: 'fadeUp 0.5s 0.5s ease both',
        }}>
          <p style={{ color: 'var(--text2)', marginBottom: '1rem' }}>Still have questions?</p>
          <a href="https://discord.gg/yZyHEugsPF" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#5865F2', color: '#fff', padding: '0.7rem 1.8rem',
            borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >Join Discord</a>
        </div>
      </div>
    </main>
  )
}
