import { useState } from 'react'
import ImageSlot from '../components/ImageSlot.jsx'
import Lightbox from '../components/Lightbox.jsx'
import './Play.css'

const items = [
  {
    id: 'group-1',
    src: '/images/play/Group%201.jpg',
    alt: 'Group 1',
    ratio: '604 / 774',
    caption: 'Me and the rover I designed an interface for',
  },
  {
    id: 'zenbook',
    src: '/images/play/ZenBook%20Duo%2014.png',
    alt: 'ZenBook Duo 14',
    ratio: '1500 / 1125',
    caption: "Led a team to make a landing page for CSUF's largest hackathon",
  },
  {
    id: 'fullybeyond',
    src: '/images/play/FullyBeyond.png',
    alt: 'FullyBeyond',
    ratio: '724 / 796',
    caption: "Founding product designer for Fullerton's first design-a-thon",
  },
  {
    id: 'fullyhackz24',
    src: '/images/play/fullyhackz24.png',
    alt: 'FullyHackz 24',
    ratio: '411 / 703',
    caption: "Programmed landing page for ACM's largest hackathon",
  },
  {
    id: 'marchbmad',
    src: '/images/play/marchbmad.png',
    alt: 'March BMAD',
    ratio: '829 / 1907',
    caption: "Created landing page for ACM's coding competition",
  },
  {
    id: 'cakedrawing',
    src: '/images/play/cakedrawing.png',
    alt: 'Cake drawing',
    ratio: '1824 / 2507',
    caption: 'Drawn by me on procreate',
  },
  {
    id: 'raspberrypi',
    src: '/images/play/raspberrypi.jpeg',
    alt: 'Raspberry Pi',
    ratio: '480 / 640',
    caption: 'My first cyberdeck ft Raspberry Pi Pico',
  },
  {
    id: 'valtodo',
    src: '/images/play/valtodo.png',
    alt: 'Valtodo',
    ratio: '1918 / 870',
    caption: 'Valorant themed to-do list, click to view',
    link: 'https://5dailies.vercel.app/',
  },
]

export default function Play() {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)

  return (
    <main className="page play-page">
      <div className="play-grid">
        {items.map((item, index) => (
          <button
            key={item.id}
            className="play-grid__item"
            style={{ aspectRatio: item.ratio, '--i': Math.min(index, 8) }}
            onClick={() =>
              item.link ? window.open(item.link, '_blank', 'noopener') : setActive(item)
            }
            onMouseMove={(e) => setHover({ caption: item.caption, x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setHover(null)}
            aria-label={`Open ${item.alt}`}
          >
            <ImageSlot src={item.src} alt={item.alt} />
          </button>
        ))}
      </div>

      {hover && (
        <span
          className="play-grid__tooltip"
          style={{ left: hover.x, top: hover.y }}
          aria-hidden="true"
        >
          {hover.caption}
        </span>
      )}

      {active && (
        <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />
      )}
    </main>
  )
}
