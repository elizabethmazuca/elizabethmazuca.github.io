import { useRef } from 'react'
import useStageFit from '../utils/useStageFit.js'
import './CaravanHero.css'

const BASE = '/images/work/google-caravan/hero'
const STAGE_W = 1024
const STAGE_H = 792

// Caravan mode icon: the front corner of a car with "2+" tucked into it
const CaravanIcon = () => (
  <svg className="ch__pill-icon" viewBox="72 56 232 164" fill="currentColor">
    <path
      d="M94 128 106 84Q110 70 124 70H224Q234 70 238 80L246 102"
      fill="none"
      stroke="currentColor"
      strokeWidth="17"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      d="M80 215V130Q80 118 92 118H174A54 54 0 0 0 152 196H101V215ZM101 155A13 13 0 1 0 127 155 13 13 0 1 0 101 155Z"
    />
    <path d="M180 212v-14l38-34q8-8 8-15 0-12-13-12-12 0-15 13l-17-5q6-26 33-26 30 0 30 28 0 14-13 25l-24 21h38v19zM260 152h15v20h20v15h-20v20h-15v-20h-20v-15h20z" />
  </svg>
)

const CLOCK =
  'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'

// Google Caravan cover: a 1024×792 stage (the old Lottie's size) scaled to
// cover its box like the Lottie did. One looping timeline: title card, phone
// rises in navigation, the separation alert drops in and "Show Gracie" is
// tapped, then the screen scrolls to a live group poll.
export default function CaravanHero({ alt = '', scale = 1, align = 'center', className = '' }) {
  const ref = useRef(null)
  const { fit, visible } = useStageFit(ref, STAGE_W, STAGE_H, { scale, align })
  const paused = !visible

  return (
    <div
      ref={ref}
      className={['img-slot', 'img-slot--rounded', 'caravan-hero', paused ? 'caravan-hero--paused' : '', className]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={alt}
    >
      <div className="ch" style={{ transform: fit || undefined, visibility: fit ? 'visible' : 'hidden' }} aria-hidden="true">
        <img className="ch__map" src={`${BASE}/map.webp`} alt="" />

        <div className="ch__intro">
          <img className="ch__logo" src={`${BASE}/google-logo.webp`} alt="" />
          <span className="ch__pill">
            Caravan Mode
            <CaravanIcon />
          </span>
          <p className="ch__tagline">a better way to keep your party together on the road</p>
        </div>

        <div className="ch__phone">
          <div className="ch__screen">
            <img className="ch__nav" src={`${BASE}/nav-screen.webp`} alt="" />

            <div className="ch__gracie">
              <span className="ch__pin">G</span>
              <span className="ch__pin-label">Gracie · 5 mi behind</span>
            </div>

            <div className="ch__alert">
              <div className="ch__alert-top">
                <span className="ch__alert-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M12 4.5 20.5 19.5h-17z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path d="M12 10v4.2" stroke="#fbe2c2" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="17.1" r="1.1" fill="#fbe2c2" />
                  </svg>
                </span>
                <div>
                  <p className="ch__alert-title">You&rsquo;re 5 miles apart from Gracie</p>
                  <p className="ch__alert-meta">Caravan · Just now</p>
                </div>
              </div>
              <div className="ch__alert-buttons">
                <span className="ch__btn">Dismiss</span>
                <span className="ch__btn ch__btn--primary">
                  Show
                  <span className="ch__touch" />
                </span>
              </div>
            </div>

            <div className="ch__sheet">
              <div className="ch__handle" />
              <p className="ch__eyebrow">Caravan Poll</p>
              <p className="ch__question">Where to get slushies?</p>
              <div className="ch__live">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={CLOCK} />
                </svg>
                <div className="ch__live-body">
                  <p className="ch__live-text">
                    <strong>Live</strong> · Voting closes in 4:52
                  </p>
                  <div className="ch__progress">
                    <span />
                  </div>
                </div>
              </div>
              <div className="ch__choices">
                <span className="ch__choice">7-Eleven</span>
                <span className="ch__choice ch__choice--pick">Buc-ee&rsquo;s</span>
                <span className="ch__choice">ampm</span>
              </div>
            </div>

            <div className="ch__home" />
          </div>
        </div>
      </div>
    </div>
  )
}
