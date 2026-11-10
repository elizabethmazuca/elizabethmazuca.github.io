import { useEffect, useState } from 'react'
import '@fontsource/space-grotesk/600.css'
import './EventLog.css'

const INITIAL = [
  { time: '18:42:07', level: 'WARN', text: 'IMU drift above threshold' },
  { time: '18:41:55', level: 'INFO', text: 'Waypoint 1 reached' },
  { time: '18:40:12', level: 'INFO', text: 'Autonomy started' },
  { time: '18:39:48', level: 'INFO', text: 'GPS fix acquired, 9 satellites' },
  { time: '18:39:30', level: 'INFO', text: 'Cameras online (3)' },
  { time: '18:39:21', level: 'INFO', text: 'Base station connected' },
  { time: '18:39:02', level: 'INFO', text: 'Rover powered on' },
]

// What the rover "thinks" while driving, streamed in on a loop
const STREAM = [
  { level: 'INFO', text: 'Heading corrected +4°' },
  { level: 'INFO', text: 'Obstacle detected 2.4 m ahead' },
  { level: 'INFO', text: 'Replanning path around obstacle' },
  { level: 'INFO', text: 'New path found, 3 segments' },
  { level: 'WARN', text: 'Low traction, reducing speed' },
  { level: 'INFO', text: 'Waypoint 2 reached' },
  { level: 'INFO', text: 'Searching for ArUco marker' },
  { level: 'INFO', text: 'Marker found, ID 3' },
  { level: 'WARN', text: 'Slope 17° near limit' },
  { level: 'INFO', text: 'Waypoint 3 reached' },
]

const MAX_ROWS = 9
const INTERVAL_MS = 2200

const toSeconds = (t) => t.split(':').reduce((acc, n) => acc * 60 + Number(n), 0)
const toTime = (s) =>
  [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, '0')).join(':')

// Titan Rover autonomy event log, newest entry on top
export default function EventLog() {
  // Newest row gets the highest id, so prev[0].id + 1 is always unique
  const [rows, setRows] = useState(() => INITIAL.map((r, i) => ({ ...r, id: INITIAL.length - i })))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let step = 0
    const timer = setInterval(() => {
      const s = step
      step += 1
      setRows((prev) => {
        const time = toTime(toSeconds(prev[0].time) + 4 + ((s * 7) % 11))
        return [{ ...STREAM[s % STREAM.length], time, id: prev[0].id + 1 }, ...prev].slice(0, MAX_ROWS)
      })
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="event-log">
      <h3 className="event-log__title">Event Log</h3>
      <ol className="event-log__panel" aria-label="Rover autonomy event log">
        {rows.map((r) => (
          <li key={r.id} className="event-log__row">
            <span className="event-log__time">{r.time}</span>
            <span className={`event-log__level event-log__level--${r.level.toLowerCase()}`}>{r.level}</span>
            <span className="event-log__text">{r.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
