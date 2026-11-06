import { useRef } from 'react'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import useStageFit from '../utils/useStageFit.js'
import './RoverScience.css'

const STAGE_W = 955
const STAGE_H = 622

// Lucide-style outline icons
const Icon = ({ children, size = 16, ...props }) => (
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

const CAMERAS = ['Rear Camera', 'Rear Camera', 'Rear Camera']

const Btn = ({ className, icon, iconSize = 16, children }) => (
  <span className={className}>
    <Icon size={iconSize}>{icon}</Icon>
    {children}
  </span>
)

// Titan Rover "Science" page, rebuilt from the Figma design as a static mockup
export default function RoverScience() {
  const ref = useRef(null)
  const { fit } = useStageFit(ref, STAGE_W, STAGE_H)

  return (
    <div ref={ref} className="rover-sci" role="img" aria-label="Titan Rover science page: drill, life detection and collector drill controls beside three live camera feeds">
      <div className="rs" style={{ transform: fit || undefined, visibility: fit ? 'visible' : 'hidden' }} aria-hidden="true">
        <aside className="rs__side">
          <div className="rs__brand">
            <p className="rs__logo">
              TITAN <span>//</span>
            </p>
            <p className="rs__logo-sub">Rover Controls</p>
          </div>

          <nav className="rs__nav">
            {NAV.map((n) => (
              <span key={n.label} className={`rs__nav-item${n.label === 'Science' ? ' rs__nav-item--on' : ''}`}>
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
          <span className="rs__dots" />
          <span className="rs__status">
            <i />
            Connected
          </span>
          <span className="rs__battery">
            <Icon size={15}>
              <rect x="7" y="4" width="10" height="17" rx="2" />
              <path d="M10 2h4" />
              <rect x="9.5" y="9" width="5" height="9.5" rx="0.5" fill="currentColor" stroke="none" />
            </Icon>
            12.4 V
          </span>
          <span className="rs__mode">
            Manual Mode
            <Icon size={13}>
              <path d="m6 9 6 6 6-6" />
            </Icon>
          </span>
          <span className="rs__kill">Kill Switch</span>
        </header>

        <main className="rs__main">
          <h3 className="rs__title">Science</h3>
          <p className="rs__subtitle">Collect &amp; analyze soil samples</p>

          <section className="rs__group rs__group--open">
            <Icon size={22} className="rs__group-icon">
              {/* Pipette */}
              <path d="m2 22 1-1h3l9-9M3 21v-3l9-9M15 6l3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3z" />
            </Icon>
            <p className="rs__group-title">Soil Collection</p>
            <p className="rs__group-sub">Operate the drill to collect a soil sample</p>
            <div className="rs__drill">
              <Btn className="rs__drill-btn rs__drill-btn--outline" iconSize={18} icon={<path d="M12 5v14M6 13l6 6 6-6" />}>
                Lower Drill
              </Btn>
              <Btn
                className="rs__drill-btn"
                iconSize={18}
                icon={
                  <>
                    {/* Slanted loop that nearly closes, ending in an arrowhead */}
                    <path d="M15.6 13.2c1.6-3 1.9-7.4-1.6-7.4-4.3 0-8.3 4.8-8.3 9.3 0 3.6 4.2 3.8 8.4 1.6" />
                    <path d="M11.6 15.3l2.6 1.4-1.1 2.7" />
                  </>
                }
              >
                Start Drill
              </Btn>
              <Btn className="rs__drill-btn" iconSize={18} icon={<path d="M12 19V5M6 11l6-6 6 6" />}>
                Raise Drill
              </Btn>
            </div>
          </section>

          <section className="rs__group">
            <p className="rs__group-title">Life Detection</p>
            <p className="rs__group-sub">Analyze collected sample</p>
            <span className="rs__sensor">
              <Icon size={20}>
                <path d="M12 3v12M7 10l5 5 5-5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
              </Icon>
              <span>
                <strong>Lower Sensor</strong>
                <small>Deploy to sample area</small>
              </span>
            </span>
          </section>

          <section className="rs__group">
            <p className="rs__group-title">Collector Drill</p>
            <p className="rs__group-sub">Control the collector drill rotation</p>
            <div className="rs__collector">
              <Btn className="rs__col-btn" icon={<path d="M11 19 4 12l7-7zM20 19l-7-7 7-7z" />}>
                Reverse
              </Btn>
              <Btn className="rs__col-btn" icon={<rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" />}>
                Stop
              </Btn>
              <Btn className="rs__col-btn" icon={<path d="m13 19 7-7-7-7zM4 19l7-7-7-7z" />}>
                Forward
              </Btn>
            </div>
          </section>
        </main>

        <aside className="rs__cams">
          <h3 className="rs__cams-title">Cameras</h3>
          <p className="rs__subtitle">Live feeds</p>
          {CAMERAS.map((name, i) => (
            <div className="rs__feed" key={i}>
              <span className="rs__feed-label">
                <Icon size={14}>
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
                  <circle cx="12" cy="13" r="3" />
                </Icon>
                {name}
              </span>
              <span className="rs__live">
                <i />
                Live
              </span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
