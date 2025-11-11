import { RefObject, useEffect } from 'react'

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref, callback])
}

export default useClickOutside
