import { useEffect } from 'react'
import ImageSlot from './ImageSlot.jsx'
import './Lightbox.css'

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
        <ImageSlot src={src} alt={alt} rounded={false} />
      </div>
    </div>
  )
}
