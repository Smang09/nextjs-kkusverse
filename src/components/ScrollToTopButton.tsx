'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import useThrottle from '@/hooks/useThrottle'

const SCROLL_THRESHOLD = 200
const MIN_SCROLL_TO_SHOW = 200

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef<number>(0)

  const handleScroll = () => {
    const scrollY = window.scrollY
    setVisible(scrollY < lastScrollY.current && scrollY > MIN_SCROLL_TO_SHOW)
    lastScrollY.current = scrollY
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const throttledScroll = useThrottle(handleScroll, SCROLL_THRESHOLD)

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [throttledScroll])

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-4 sm:right-6 bottom-18 p-3 border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow rounded-full cursor-pointer transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ArrowUpIcon className="size-5 text-slate-900 dark:text-white" />
    </button>
  )
}

export default ScrollToTopButton
