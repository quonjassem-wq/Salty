import React, { useEffect, useRef } from 'react'

export default function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const count = 40
    container.innerHTML = ''

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const duration = Math.random() * 15 + 8
      const delay = Math.random() * 10
      const drift = (Math.random() - 0.5) * 200

      p.style.cssText = `
        position: fixed;
        left: ${x}vw;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: var(--accent);
        opacity: 0;
        pointer-events: none;
        z-index: 0;
        --drift: ${drift}px;
        animation: particle-float ${duration}s ${delay}s linear infinite;
        box-shadow: 0 0 ${size * 3}px var(--accent);
      `
      container.appendChild(p)
    }

    // Add grid lines
    const grid = document.createElement('div')
    grid.style.cssText = `
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(123,111,240,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(123,111,240,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 0;
    `
    container.appendChild(grid)
  }, [])

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
}
