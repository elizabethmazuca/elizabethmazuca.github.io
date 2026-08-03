import { useState } from 'react'
import './ImageSlot.css'

export default function ImageSlot({
  src,
  alt = '',
  className = '',
  style,
  onClick,
  rounded = true,
  fit = 'cover',
}) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  const classes = ['img-slot', rounded ? 'img-slot--rounded' : '', className]
    .filter(Boolean)
    .join(' ')

  if (showPlaceholder) {
    return (
      <div
        className={`${classes} img-slot--placeholder`}
        style={style}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        onClick={onClick}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      style={{ objectFit: fit, ...style }}
      onClick={onClick}
      onError={() => setFailed(true)}
    />
  )
}
