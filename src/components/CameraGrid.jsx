import { useEffect, useRef, useState } from 'react'
import RoverShell, { CameraIcon } from './RoverShell.jsx'
import './CameraGrid.css'

const CAMERAS = ['Front Camera', 'Rear Camera', 'Mast Camera', 'Left Camera', 'Right Camera', 'Ground Camera']
const N = CAMERAS.length

const GAP = 10 // px between feeds
const FIRST_MS = 300 // pause on the empty page before the first feed
const STEP_MS = 1000 // gap between feeds popping in (long enough to see the re-layout)
const HOLD_MS = 2600 // how long the full grid stays up before the loop restarts
const FADE_MS = 350 // fade-out of the full grid before the next round

// Where feed i sits when n feeds are on screen: one feed fills the page, then
// two columns with rows added as needed. An odd last feed spans the full width.
function slot(i, n) {
  const cols = n === 1 ? 1 : 2
  const rows = Math.ceil(n / cols)
  const row = Math.floor(i / cols)
  const col = i % cols
  const fullWidth = cols === 1 || (i === n - 1 && n % 2 === 1)
  const rowH = `((100% - ${(rows - 1) * GAP}px) / ${rows})`
  return {
    left: col === 0 ? '0%' : `calc(50% + ${GAP / 2}px)`,
    width: fullWidth ? '100%' : `calc(50% - ${GAP / 2}px)`,
    top: `calc(${row} * (${rowH} + ${GAP}px))`,
    height: `calc(${rowH})`,
  }
}

// Titan Rover "Navigation" page: camera feeds pop in one at a time and the
// layout re-tiles around them, like the team's camera budget growing from 1 to 6
export default function CameraGrid() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  // 0 = empty, 1..N = that many feeds, N + 1 = full grid fading out
  const [step, setStep] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(N)
      return
    }
    const delay = step === 0 ? FIRST_MS : step < N ? STEP_MS : step === N ? HOLD_MS : FADE_MS
    const t = setTimeout(() => setStep((s) => (s > N ? 0 : s + 1)), delay)
    return () => clearTimeout(t)
  }, [visible, step])

  const shown = Math.min(step, N)

  return (
    <div ref={ref} className="cam-grid">
      <RoverShell
        active="Navigation"
        variant="nav"
        height={682}
        label="Titan Rover navigation page with six live camera feeds: front, rear, mast, left, right and ground"
      >
        <main className="cam-grid__main">
          <h3 className="rs__title">Navigation</h3>
          <div className={`cam-grid__feeds${step > N ? ' cam-grid__feeds--fading' : ''}`}>
            {CAMERAS.map((name, i) => (
              <div
                key={name}
                className={`cam-grid__feed${i < shown ? ' cam-grid__feed--on' : ''}`}
                // Hidden feeds wait in the spot they'll pop into
                style={slot(i, Math.max(shown, i + 1))}
              >
                <span className="rs__feed-label">
                  <CameraIcon />
                  {name}
                </span>
                <span className="rs__live">
                  <i />
                  Live
                </span>
              </div>
            ))}
          </div>
        </main>
      </RoverShell>
    </div>
  )
}
