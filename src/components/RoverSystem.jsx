import { useEffect, useRef, useState } from 'react'
import RoverShell, { Icon } from './RoverShell.jsx'
import './RoverSystem.css'

const POWER = [
  ['Voltage', '3.5 V'],
  ['Current', '8.6 A'],
  ['Charge', '19%'],
  ['Board Temp', '41 °C'],
]

const CONNECTION = [
  ['Latency', '42 ms'],
  ['Signal', '-61 dBm'],
  ['Loss', '0.2%'],
]

const SUBSYSTEMS = [
  ['Drive motors', 'OK'],
  ['Arm controller', 'OK'],
  ['Science board', 'OK'],
  ['GPS', 'Fix · 9 sats'],
  ['Cameras', '3 live'],
  ['IMU', 'Calibrate', 'warn'],
]

const ALERT_SHOW_MS = 4200 // alert stays up
const ALERT_GAP_MS = 1400 // page sits quietly before the alert (re)appears

const Panel = ({ title, sub, className = '', children }) => (
  <section className={`sys__panel ${className}`}>
    <p className="sys__panel-title">{title}</p>
    <p className="sys__panel-sub">{sub}</p>
    {children}
  </section>
)

const Stats = ({ items }) => (
  <div className="sys__stats">
    {items.map(([label, value]) => (
      <div className="sys__stat" key={label}>
        <span className="sys__stat-label">{label}</span>
        <span className="sys__stat-value">{value}</span>
      </div>
    ))}
  </div>
)

// Titan Rover "System" page: power, connection and subsystem health, with a
// low battery alert that pops in on a loop
export default function RoverSystem() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) {
      setAlert(false)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAlert(true)
      return
    }
    const t = setTimeout(() => setAlert((a) => !a), alert ? ALERT_SHOW_MS : ALERT_GAP_MS)
    return () => clearTimeout(t)
  }, [visible, alert])

  return (
    <div ref={ref} className="rover-sys">
      <RoverShell
        active="System"
        variant="full"
        height={692}
        voltage="3.5 V"
        lowBattery
        label="Titan Rover system page showing power, connection and subsystem health, with a pop-up alert warning that the battery is at 19%"
      >
        <main className="sys">
          <h3 className="rs__title">System</h3>
          <p className="rs__subtitle">Monitor power, hardware and connection health</p>

          <div className="sys__row">
            <Panel title="Power" sub="Main battery pack" className="sys__panel--power">
              <Stats items={POWER} />
              <div className="sys__bar">
                <i style={{ width: '19%' }} />
              </div>
            </Panel>
            <Panel title="Connection" sub="Radio link to base station" className="sys__panel--conn">
              <Stats items={CONNECTION} />
            </Panel>
          </div>

          <Panel title="Subsystems" sub="Status of each onboard controller">
            <div className="sys__subs">
              {SUBSYSTEMS.map(([name, status, tone]) => (
                <div key={name} className={`sys__sub${tone ? ` sys__sub--${tone}` : ''}`}>
                  <i />
                  <span className="sys__sub-name">{name}</span>
                  <span className="sys__sub-status">{status}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Maintenance" sub="Restart or recalibrate hardware">
            <div className="sys__actions">
              <span className="sys__action sys__action--orange">Calibrate IMU</span>
              <span className="sys__action">Restart Cameras</span>
              <span className="sys__action sys__action--red">Reboot Computer</span>
            </div>
          </Panel>
        </main>

        <div className={`sys__alert${alert ? ' sys__alert--on' : ''}`}>
          <span className="sys__alert-icon">
            <Icon size={20}>
              <rect x="2" y="7" width="16" height="10" rx="2" />
              <path d="M22 11v2M6 11v2" />
            </Icon>
          </span>
          <span className="sys__alert-text">
            <strong>Battery at 19%</strong>
          </span>
          <span className="sys__alert-btn">Dismiss</span>
        </div>
      </RoverShell>
    </div>
  )
}
