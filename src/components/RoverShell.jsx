import { useRef } from 'react'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import useStageFit from '../utils/useStageFit.js'
import './RoverScience.css'

// Lucide-style outline icons
export const Icon = ({ children, size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
)

export const CameraIcon = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
    <circle cx="12" cy="13" r="3" />
  </Icon>
)

const NAV = [
  {
    label: 'Navigation',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </>
    ),
  },
  {
    label: 'Science',
    icon: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9" />,
  },
  {
    label: 'Arm',
    // Robotic arm: base, upright, angled forearm and a two-prong claw
    icon: <path d="M3.5 21h7M7 21v-7.5l5-5h8.5M17.5 8.5v4M20.5 8.5v4" />,
  },
  {
    label: 'System',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </>
    ),
  },
]

// Titan Rover app frame (sidebar + status bar), scaled from a fixed design-size
// stage to fit its box. Page content goes in as children, after the top bar.
// `voltage` is the status bar reading; `lowBattery` turns it red.
export default function RoverShell({ active, width = 955, height = 622, label, variant, voltage = '12.4 V', lowBattery = false, children }) {
  const ref = useRef(null)
  const { fit } = useStageFit(ref, width, height)

  return (
    <div ref={ref} className="rover-sci" style={{ aspectRatio: `${width} / ${height}` }} role="img" aria-label={label}>
      <div
        className={`rs${variant ? ` rs--${variant}` : ''}`}
        style={{ width, height, transform: fit || undefined, visibility: fit ? 'visible' : 'hidden' }}
        aria-hidden="true"
      >
        <aside className="rs__side">
          <div className="rs__brand">
            <p className="rs__logo">
              TITAN <span>//</span>
            </p>
            <p className="rs__logo-sub">Rover Controls</p>
          </div>

          <nav className="rs__nav">
            {NAV.map((n) => (
              <span key={n.label} className={`rs__nav-item${n.label === active ? ' rs__nav-item--on' : ''}`}>
                <Icon size={17}>{n.icon}</Icon>
                {n.label}
              </span>
            ))}
          </nav>

          <div className="rs__footer">
            {/* Planet with a tilted ring that loops out past it at both ends */}
            <Icon size={18} strokeWidth="2">
              <path transform="rotate(12 12 12)" d="M18.8 13.6c2.3 2.1 3.5 4 3.1 4.9-.7 1.5-5.8-.3-11.3-3.8C5.2 11.1 1.4 7 2.1 5.6c.5-.9 2.9-.4 5.8.8" />
              <circle cx="12" cy="12" r="7" />
            </Icon>
            <p>
              Titan Rover
              <br />
              Made with &lt;3 in
              <br />
              Fullerton, California
            </p>
          </div>
        </aside>

        <header className="rs__top">
          <span className="rs__status">
            <i />
            Connected
          </span>
          <span className={`rs__battery${lowBattery ? ' rs__battery--low' : ''}`}>
            <Icon size={15}>
              <rect x="7" y="4" width="10" height="17" rx="2" />
              <path d="M10 2h4" />
              {/* Charge level: nearly full normally, just a sliver when low */}
              <rect
                x="9.5"
                y={lowBattery ? 16.5 : 9}
                width="5"
                height={lowBattery ? 2 : 9.5}
                rx="0.5"
                fill="currentColor"
                stroke="none"
              />
            </Icon>
            {voltage}
          </span>
          <span className="rs__mode">
            Manual Mode
            <Icon size={13}>
              <path d="m6 9 6 6 6-6" />
            </Icon>
          </span>
          <span className="rs__kill">Kill Switch</span>
        </header>

        {children}
      </div>
    </div>
  )
}
