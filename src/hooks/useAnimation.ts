import { useCallback, useEffect, useState } from 'react'

const useAnimation = (active: boolean) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const shouldRender = active || isMounted
  const animationTrigger = active && isMounted

  const onTransitionEnd = useCallback(() => {
    setIsAnimating(false)
    if (!active) setIsMounted(false)
  }, [active])

  useEffect(() => {
    if (shouldRender) setIsAnimating(true)
    if (active) setIsMounted(true)
  }, [active, shouldRender])

  return { shouldRender, animationTrigger, isAnimating, onTransitionEnd }
}

export default useAnimation
