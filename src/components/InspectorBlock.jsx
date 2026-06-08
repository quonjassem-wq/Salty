import React, { useState, useEffect } from 'react'

export default function InspectorBlock() {
  const [blocked, setBlocked] = useState(false)
  const [forgiven, setForgiven] = useState(() => sessionStorage.getItem('salt-forgiven') === 'true')

  useEffect(() => {
    if (forgiven) return

    const threshold = 160

    const check = () => {
      const widthDiff = window.outerWidth - window.innerWidth
      const heightDiff = window.outerHeight - window.innerHeight
      if (widthDiff > threshold || heightDiff > threshold) {
        setBlocked(true)
      }
    }

    // Block keyboard shortcuts
    const onKey = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault()
        e.stopPropagation()
        setBlocked(true)
        return false
      }
    }

    // Block right-click context menu
    const onCtx = (e) => e.preventDefault()

    window.addEventListener('keydown', onKey, true)
    window.addEventListener('contextmenu', onCtx)
    const interval = setInterval(check, 1000)

    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('contextmenu', onCtx)
      clearInterval(interval)
    }
  }, [forgiven])

  const handleSorry = () => {
    sessionStorage.setItem('salt-forgiven', 'true')
    setForgiven(true)
    setBlocked(false)
  }

  if (!blocked || forgiven) return null

  return (
    <div className="inspector-block">
      <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>⚠️</div>
      <h1>Caught you trying to get the source</h1>
      <p>Do you want to get banned?</p>
      <p style={{ fontSize: '0.8rem', marginTop: '-0.5rem', color: 'var(--text3)' }}>
        This action has been logged.
      </p>
      <button onClick={handleSorry}>
        I am sorry
      </button>
    </div>
  )
}
