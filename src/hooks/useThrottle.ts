import { useRef } from 'react'

const useThrottle = <T extends unknown[]>(callback: (...params: T) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...params: T) => {
    if (!timer.current) {
      callback(...params)
      timer.current = setTimeout(() => {
        timer.current = null
      }, delay)
    }
  }
}

export default useThrottle
