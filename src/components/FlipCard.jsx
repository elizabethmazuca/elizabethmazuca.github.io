import { useState } from 'react'
import ImageSlot from './ImageSlot.jsx'
import './FlipCard.css'

export default function FlipCard({ label, image, back, rotation = 0, imageScale = 1 }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flip-card">
      <span className="flip-card__label">{label}</span>
      <button
        className="flip-card__frame"
        style={{ '--rotate': `${rotation}deg` }}
        onClick={() => setFlipped((f) => !f)}
        aria-label={`${label} — tap to flip`}
      >
        <div className={`flip-card__inner${flipped ? ' flip-card__inner--flipped' : ''}`}>
          <div className="flip-card__face flip-card__face--front">
            <ImageSlot
              src={image}
              alt={label}
              rounded={false}
              style={imageScale !== 1 ? { transform: `scale(${imageScale})` } : undefined}
            />
          </div>
          <div className="flip-card__face flip-card__face--back">
            <p>{back}</p>
          </div>
        </div>
      </button>
    </div>
  )
}
