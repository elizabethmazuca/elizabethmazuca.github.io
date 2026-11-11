import RoverShell, { CameraIcon, Icon } from './RoverShell.jsx'

const CAMERAS = ['Rear Camera', 'Rear Camera', 'Rear Camera']

const Btn = ({ className, icon, iconSize = 16, children }) => (
  <span className={className}>
    <Icon size={iconSize}>{icon}</Icon>
    {children}
  </span>
)

// Titan Rover "Science" page, rebuilt from the Figma design as a static mockup
export default function RoverScience() {
  return (
    <RoverShell
      active="Science"
      label="Titan Rover science page: drill, life detection and collector drill controls beside three live camera feeds"
    >
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
              <CameraIcon />
              {name}
            </span>
            <span className="rs__live">
              <i />
              Live
            </span>
          </div>
        ))}
      </aside>
    </RoverShell>
  )
}
