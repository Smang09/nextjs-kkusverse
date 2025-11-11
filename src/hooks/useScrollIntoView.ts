import { useEffect, useRef } from 'react'

const useScrollIntoView = <T extends HTMLElement>(trigger: boolean) => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (trigger && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [trigger])

  return ref
}

export default useScrollIntoView
