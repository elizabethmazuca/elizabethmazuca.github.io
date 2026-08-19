import { useRef, useState } from 'react'
import './Carousel.css'

export default function Carousel({ slides, alt = '', aspect = '427 / 858', maxWidth = '260px' }) {
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const startX = useRef(0)

  const items = slides.map((slide) => (typeof slide === 'string' ? { src: slide } : slide))

  const go = (delta) => setIndex((i) => (i + delta + items.length) % items.length)

  const onPointerDown = (e) => {
    setDragging(true)
    startX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    setDragX(e.clientX - startX.current)
  }

  const endDrag = () => {
    if (!dragging) return
    const threshold = 50
    if (dragX < -threshold) go(1)
    else if (dragX > threshold) go(-1)
    setDragging(false)
    setDragX(0)
  }

  const trackStyle = {
    transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
    transition: dragging ? 'none' : 'transform 0.4s ease',
  }

  return (
    <div className="carousel">
      <button type="button" className="carousel__arrow" onClick={() => go(-1)} aria-label="Previous slide">
        ‹
      </button>

      <div className="carousel__body">
        <div
          className="carousel__frame"
          style={{ aspectRatio: aspect, maxWidth }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          <div className="carousel__track" style={trackStyle}>
            {items.map((item, i) => (
              <div className="carousel__slide" key={item.src || i}>
                {item.src ? (
                  <img
                    src={item.src}
                    alt={`${alt} ${i + 1} of ${items.length}`}
                    className="carousel__image"
                    draggable={false}
                  />
                ) : (
                  <div className="carousel__placeholder" />
                )}
                {item.note && (
                  <div className="carousel__note">
                    <p className="carousel__note-title">{item.note.title}</p>
                    <p className="carousel__note-body">{item.note.body}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="carousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel__dot${i === index ? ' carousel__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <button type="button" className="carousel__arrow" onClick={() => go(1)} aria-label="Next slide">
        ›
      </button>
    </div>
  )
}
