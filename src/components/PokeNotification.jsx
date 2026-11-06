import './PokeNotification.css'

// Material Icons: directions_car and the hand from touch_app (pointed left,
// with a rounded thumb tip)
const CAR =
  'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z'
const HAND =
  'M18.84 15.87l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.5.5c-.4.4-.4 1 0 1.4l4.65 3.84c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z'

// "Gracie's car poked you!" banner: the finger pokes the car, the car jolts,
// and the lines above it jump up, on a loop
export default function PokeNotification() {
  return (
    <div className="poke" role="img" aria-label="Notification: Gracie’s car poked you!">
      <span className="poke__avatar" aria-hidden="true">
        G
      </span>
      <svg className="poke__icon" viewBox="0 0 80 56" fill="currentColor" aria-hidden="true">
        <g className="poke__burst" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M11 10 7 6M22 7V1M33 10l4-4" />
        </g>
        <g className="poke__car">
          <g transform="translate(0 9) scale(1.833)">
            <path d={CAR} />
          </g>
        </g>
        <g className="poke__hand">
          <g transform="translate(43 13) scale(1.25) rotate(-90 12 12)">
            <path d={HAND} stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
      <p className="poke__text">Gracie’s car poked you!</p>
    </div>
  )
}
