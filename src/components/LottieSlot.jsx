import { useEffect, useRef, useState } from 'react'
// lottie-react's CJS "main" build lacks an __esModule marker, which makes
// Vite's CJS interop double-wrap the default export. Importing the real ESM
// build directly sidesteps that entirely.
import Lottie from 'lottie-react/build/index.es.js'
import ImageSlot from './ImageSlot.jsx'
import './ImageSlot.css'

export default function LottieSlot({
  src,
  fallback,
  alt = '',
  className = '',
  rounded = true,
  scale = 1,
  heightScale = 100,
  align = 'center',
  playWhenCentered = false,
  background = 'var(--placeholder)',
}) {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)
  const [isCentered, setIsCentered] = useState(false)
  const wrapperRef = useRef(null)
  const lottieRef = useRef(null)

  useEffect(() => {
    if (!src) return
    let cancelled = false
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [src])

  // Fires only when the element crosses the vertical midline of the viewport,
  // since shrinking the root by 50% top and bottom leaves a single center line.
  useEffect(() => {
    if (!playWhenCentered || !wrapperRef.current) return
    const observer = new IntersectionObserver(([entry]) => setIsCentered(entry.isIntersecting), {
      rootMargin: '-50% 0px -50% 0px',
    })
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [playWhenCentered, data])

  useEffect(() => {
    if (!playWhenCentered || !lottieRef.current) return
    if (isCentered) {
      lottieRef.current.play()
    } else {
      lottieRef.current.pause()
    }
  }, [isCentered, playWhenCentered])

  if (!src || failed || !data) {
    return <ImageSlot src={fallback} alt={alt} className={className} rounded={rounded} />
  }

  const classes = ['img-slot', rounded ? 'img-slot--rounded' : '', className]
    .filter(Boolean)
    .join(' ')

  const transformOrigin = align === 'top' ? 'top center' : align === 'bottom' ? 'bottom center' : 'center'

  return (
    <div
      ref={wrapperRef}
      className={classes}
      style={{ overflow: 'hidden', background }}
      aria-label={alt}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        loop
        autoplay={!playWhenCentered}
        style={{
          width: '100%',
          height: `${heightScale}%`,
          transform: `scale(${scale})`,
          transformOrigin,
        }}
        rendererSettings={{
          preserveAspectRatio: `xMidY${align === 'top' ? 'Min' : align === 'bottom' ? 'Max' : 'Mid'} slice`,
        }}
      />
    </div>
  )
}
