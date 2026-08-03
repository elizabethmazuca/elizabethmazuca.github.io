import { useEffect, useRef, useState } from 'react'
import './Typewriter.css'

const TYPE_SPEED = 55
const DELETE_SPEED = 32
const PAUSE_AFTER_TYPE = 1400
const PAUSE_AFTER_DELETE = 300

export default function Typewriter({ phrases, className = '' }) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phase, setPhase] = useState('typing')
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reducedMotion.current) {
      setText(phrases[0])
      return
    }

    const current = phrases[phraseIndex]
    let timeout

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED)
      } else {
        timeout = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED)
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length)
          setPhase('typing')
        }, PAUSE_AFTER_DELETE)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, phraseIndex, phrases])

  return (
    <span className={`typewriter ${className}`}>
      {text}
      <span className="typewriter__cursor" aria-hidden="true" />
    </span>
  )
}
