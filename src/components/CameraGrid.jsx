import { useEffect, useRef, useState } from 'react'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import './CameraGrid.css'

const CAMERAS = ['Front Camera', 'Rear Camera', 'Mast Camera', 'Left Camera', 'Right Camera', 'Ground Camera']

const STEP_MS = 550 // gap between feeds popping in
const HOLD_MS = 2600 // how long the full grid stays up before the loop restarts
const RESET_MS = 300 // fade-out before the next round

// Titan Rover "Navigation" page: camera feeds pop in one at a time, like the
// team's camera budget growing from 2 to 6 throughout the build
export default function CameraGrid() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(CAMERAS.length)
      return
    }
    const delay = shown === 0 ? RESET_MS : shown < CAMERAS.length ? STEP_MS : HOLD_MS
    const t = setTimeout(() => setShown((n) => (n < CAMERAS.length ? n + 1 : 0)), delay)
    return () => clearTimeout(t)
  }, [visible, shown])

  return (
    <div
      ref={ref}
      className="cam-grid"
      role="img"
      aria-label="Titan Rover navigation page with six live camera feeds: front, rear, mast, left, right and ground"
    >
      <h3 className="cam-grid__title" aria-hidden="true">
        Navigation
      </h3>
      <div className="cam-grid__feeds" aria-hidden="true">
        {CAMERAS.map((name, i) => (
          <div key={name} className={`cam-grid__feed${i < shown ? ' cam-grid__feed--on' : ''}${i === 0 ? ' cam-grid__feed--active' : ''}`}>
            <span className="cam-grid__label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              {name}
            </span>
            <span className="cam-grid__live">
              <i />
              Live
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
