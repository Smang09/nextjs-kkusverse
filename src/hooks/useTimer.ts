import { useEffect, useRef, useState, useCallback } from 'react'

const useTimer = (durationMs: number, onEnd: () => void) => {
  const rafRef = useRef<number>(0)
  const endRef = useRef<number>(0)
  const lastMsRef = useRef<number>(durationMs)

  const [isActive, setActive] = useState<boolean>(false)
  const [remainingMS, setRemaining] = useState<number>(durationMs)
  const [progress, setProgress] = useState<number>(0)

  const start = useCallback(() => {
    endRef.current = Date.now() + durationMs
    lastMsRef.current = durationMs
    setRemaining(durationMs)
    setProgress(0)
    setActive(true)
  }, [durationMs])

  useEffect(() => {
    if (!isActive) return

    const tick = () => {
      const now = Date.now()
      const remainMs = Math.max(endRef.current - now, 0)

      if (remainMs !== lastMsRef.current) {
        lastMsRef.current = remainMs
        setRemaining(remainMs)
      }

      setProgress(1 - remainMs / durationMs)

      if (remainMs > 0) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setActive(false)
        onEnd()
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isActive, durationMs, onEnd])

  return { isActive, remainingMS, progress, start }
}

export default useTimer
