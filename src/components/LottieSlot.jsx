import { useEffect, useState } from 'react'
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
}) {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

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

  if (!src || failed || !data) {
    return <ImageSlot src={fallback} alt={alt} className={className} rounded={rounded} />
  }

  const classes = ['img-slot', rounded ? 'img-slot--rounded' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} style={{ overflow: 'hidden', background: 'var(--placeholder)' }} aria-label={alt}>
      <Lottie
        animationData={data}
        loop
        autoplay
        style={{ width: '100%', height: '100%', transform: `scale(${scale})`, transformOrigin: 'center' }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
    </div>
  )
}
