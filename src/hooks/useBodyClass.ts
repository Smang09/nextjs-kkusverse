import { useEffect } from 'react'

const useBodyClass = (className: string) => {
  useEffect(() => {
    const body = document.body
    body.classList.add(className)
    return () => {
      body.classList.remove(className)
    }
  }, [className])
}

export default useBodyClass
