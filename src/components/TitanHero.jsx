import { useRef } from 'react'
import useStageFit from '../utils/useStageFit.js'
import RoverScience from './RoverScience.jsx'
import './TitanHero.css'

const STAGE_W = 1024
const STAGE_H = 613

// Titan Rover cover: the team logo rises in and fades, then the Science page of
// the rover controls slides in over the planet and zooms up. Rebuilt from the
// original Jitter export (TitanRoverCover.json), same 3.17s loop.
// `zoom` is how big the Science page ends up; smaller boxes (the Work page card)
// crop the sides of the wide stage, so they pass a smaller zoom to keep it in frame.
export default function TitanHero({ alt = '', scale = 1, align = 'center', zoom = 1.6, className = '' }) {
  const ref = useRef(null)
  const { fit, visible } = useStageFit(ref, STAGE_W, STAGE_H, { scale, align })

  return (
    <div
      ref={ref}
      className={['img-slot', 'img-slot--rounded', 'titan-hero', visible ? '' : 'titan-hero--paused', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--th-zoom': zoom }}
      role="img"
      aria-label={alt}
    >
      <div className="th" style={{ transform: fit || undefined, visibility: fit ? 'visible' : 'hidden' }} aria-hidden="true">
        <img className="th__planet" src="/images/work/titan-rover/cover-planet.png" alt="" />
        <div className="th__logo">
          <img src="/images/work/titan-rover/titan-rover-logo.png" alt="" />
        </div>
        <div className="th__page">
          <RoverScience />
        </div>
      </div>
    </div>
  )
}
