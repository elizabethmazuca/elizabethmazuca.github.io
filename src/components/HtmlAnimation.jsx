import { useEffect, useRef, useState } from 'react'
import './HtmlAnimation.css'

// Embeds a fixed-size HTML animation (one that exposes window.render(t) and
// window.DURATION) scaled to fit its container, and plays it on a loop.
export default function HtmlAnimation({ src, width, height, title }) {
  const wrapRef = useRef(null)
  const frameRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const observer = new ResizeObserver(() => setScale(wrap.clientWidth / width))
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [width])

  useEffect(() => {
    let raf
    let start
    const tick = (now) => {
      const win = frameRef.current?.contentWindow
      if (win?.READY && typeof win.render === 'function') {
        start ??= now
        win.render(((now - start) / 1000) % win.DURATION)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={wrapRef} className="html-anim img-slot img-slot--rounded">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        width={width}
        height={height}
        tabIndex={-1}
        loading="lazy"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  )
}
