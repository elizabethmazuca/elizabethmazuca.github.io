import { useEffect, useRef, useState } from 'react'
import './SeparationAlert.css'

const AUTO_DISMISS_MS = 8000
const RETURN_MS = 2200
const SHOW_GRACIE_MS = 3200

const WARNING = 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'

// Caravan separation alert: slides in over the map, auto-dismisses, and loops
export default function SeparationAlert() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState('out') // 'in' | 'out' | 'gracie'
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.6 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || state === 'in') return
    const id = setTimeout(
      () => {
        setState('in')
        setCycle((c) => c + 1)
      },
      state === 'gracie' ? SHOW_GRACIE_MS : RETURN_MS,
    )
    return () => clearTimeout(id)
  }, [visible, state])

  return (
    <div className="sep-alert" ref={ref}>
      <svg className="sep-alert__map" viewBox="0 0 460 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="460" height="220" fill="#eef0f3" />
        <path d="M-10 150 470 110" stroke="#fff" strokeWidth="12" />
        <path d="M75-10 60 230" stroke="#fff" strokeWidth="10" />
        <path d="M400-10 392 230" stroke="#f3d77c" strokeWidth="14" />
        <path d="M400-10 392 230" stroke="#fde9a8" strokeWidth="9" />
        <path d="M232-10 236 230" stroke="#1a73e8" strokeWidth="9" strokeLinecap="round" />
      </svg>

      <div className={`sep-alert__gracie${state === 'gracie' ? ' sep-alert__gracie--on' : ''}`} aria-hidden="true">
        <span className="sep-alert__pin">G</span>
        <span className="sep-alert__pin-label">Gracie · 5 mi behind</span>
      </div>

      <div className={`sep-alert__card${state === 'in' ? ' sep-alert__card--in' : ''}`} role="status">
        <div className="sep-alert__top">
          <span className="sep-alert__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={WARNING} />
            </svg>
          </span>
          <div>
            <p className="sep-alert__title">You&rsquo;re 5 miles apart from Gracie</p>
            <p className="sep-alert__meta">Caravan · Just now</p>
          </div>
        </div>
        <div className="sep-alert__buttons">
          <button type="button" className="sep-alert__btn" onClick={() => setState('out')} tabIndex={state === 'in' ? 0 : -1}>
            Dismiss
          </button>
          <button
            type="button"
            className="sep-alert__btn sep-alert__btn--primary"
            onClick={() => setState('gracie')}
            tabIndex={state === 'in' ? 0 : -1}
          >
            Show Gracie
          </button>
        </div>
        {state === 'in' && (
          <span
            key={cycle}
            className="sep-alert__timer"
            style={{ animationDuration: `${AUTO_DISMISS_MS}ms` }}
            onAnimationEnd={() => setState('out')}
          />
        )}
      </div>
    </div>
  )
}
