import { useEffect, useRef, useState } from 'react'
import ImageSlot from '../components/ImageSlot.jsx'
import HtmlAnimation from '../components/HtmlAnimation.jsx'
import Lightbox from '../components/Lightbox.jsx'
import './Play.css'

const items = [
  {
    id: 'imessage-timer',
    src: '/images/play/iMessageTimer.html',
    alt: 'iMessage Timer',
    ratio: '411 / 870',
    title: 'iMessage Timer',
    caption: 'Concept to help friends stay accountable with timers sent directly in Messages',
  },
  {
    id: 'first-day',
    src: '/images/play/FirstDay.mp4',
    alt: 'Your First Day',
    ratio: '620 / 798',
    title: 'Your First Day',
    caption: 'A site that shows you what the world was like when you were born',
    link: 'https://your-first-day-gules.vercel.app/',
  },
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
    title: 'Daily Ace',
    caption: 'Valorant themed to-do list including the Valorant dopamine hit',
    link: 'https://5dailies.vercel.app/',
    linkLabel: '5dailies.vercel.app',
    wide: true,
  },
]

export default function Play() {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)
  const gridRef = useRef(null)
  const [layout, setLayout] = useState({ cols: 3, colWidth: 0, gap: 32 })

  // Masonry via CSS grid: each item spans enough 1px rows to fit its height.
  useEffect(() => {
    const grid = gridRef.current
    const measure = () => {
      const styles = getComputedStyle(grid)
      const cols = styles.gridTemplateColumns.split(' ').length
      const gap = parseFloat(styles.columnGap) || 0
      const colWidth = (grid.clientWidth - gap * (cols - 1)) / cols
      setLayout({ cols, colWidth, gap })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  const spanFor = (item) => {
    const colSpan = item.wide ? Math.min(2, layout.cols) : 1
    const width = layout.colWidth * colSpan + layout.gap * (colSpan - 1)
    const [w, h] = item.ratio.split('/').map(Number)
    return { colSpan, rowSpan: Math.ceil((width * h) / w + layout.gap) }
  }

  return (
    <main className="page play-page">
      <div className="play-grid" ref={gridRef}>
        {items.map((item, index) => {
          const { colSpan, rowSpan } = spanFor(item)
          return (
            <button
              key={item.id}
              className="play-grid__item"
              style={{
                aspectRatio: item.ratio,
                gridColumn: `span ${colSpan}`,
                gridRowEnd: `span ${rowSpan}`,
                '--i': Math.min(index, 8),
                cursor: item.src.endsWith('.html') ? 'default' : undefined,
              }}
              onClick={() =>
                item.link
                  ? window.open(item.link, '_blank', 'noopener')
                  : !item.src.endsWith('.html') && setActive(item)
              }
              onMouseMove={(e) => setHover({ ...item, x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setHover(null)}
              aria-label={`Open ${item.alt}`}
            >
              {item.src.endsWith('.html') ? (
                <HtmlAnimation src={item.src} width={411} height={870} title={item.alt} />
              ) : (
                <ImageSlot src={item.src} alt={item.alt} />
              )}
            </button>
          )
        })}
      </div>

      {hover && (
        <span
          className={`play-grid__tooltip${
            hover.x > window.innerWidth / 2 ? ' play-grid__tooltip--left' : ''
          }`}
          style={{ left: hover.x, top: hover.y }}
          aria-hidden="true"
        >
          {hover.title && <span className="play-grid__tooltip-title">{hover.title}</span>}
          <span className="play-grid__tooltip-caption">{hover.caption}</span>
          {hover.link && (
            <span className="play-grid__tooltip-link">{hover.linkLabel ?? hover.link}</span>
          )}
        </span>
      )}

      {active && <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />}
    </main>
  )
}
