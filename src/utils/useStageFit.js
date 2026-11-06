import { useEffect, useState } from 'react'

// Scales a fixed-size stage (w×h) to cover the element in `ref`, the way a
// Lottie "slice" does, then applies an extra zoom around the top/center/bottom.
// Also reports whether the element is on screen so animations can pause.
export default function useStageFit(ref, w, h, { scale = 1, align = 'center' } = {}) {
  const [fit, setFit] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const s = Math.max(width / w, height / h) * scale
      const x = (width - w * s) / 2
      const y = align === 'top' ? 0 : align === 'bottom' ? height - h * s : (height - h * s) / 2
      setFit(`translate(${x}px, ${y}px) scale(${s})`)
    })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [ref, w, h, scale, align])

  return { fit, visible }
}
