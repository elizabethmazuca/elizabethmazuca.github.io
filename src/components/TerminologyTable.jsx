import './TerminologyTable.css'

const ROWS = [
  ['Linear Actuator', 'Raise / Lower Arm'],
  ['Servo Motor', 'Rotate'],
  ['Degrees of Freedom', 'Arm Tilt'],
  ['Autonomous Mode', 'Manual / Auto Mode'],
  ['RPM / Torque', 'Speed / Power'],
  ['Battery Voltage', 'Battery Level'],
]

const iconProps = {
  width: 12,
  height: 12,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const RobotIcon = () => (
  <svg {...iconProps}>
    <path d="M12 8V4H8" />
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
  </svg>
)

const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
)

// Titan Rover: engineering jargon mapped to the labels operators actually see
export default function TerminologyTable() {
  return (
    <div className="term-table">
      <table className="term-table__table">
        <thead>
          <tr>
            <th scope="col">
              Technical Term <RobotIcon />
            </th>
            <th scope="col">
              User Friendly Label <UserIcon />
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([technical, label]) => (
            <tr key={technical}>
              <td>{technical}</td>
              <td className="term-table__label">{label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
