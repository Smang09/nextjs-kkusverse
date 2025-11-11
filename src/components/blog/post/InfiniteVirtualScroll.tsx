'use client'

import { useState, useRef, useEffect } from 'react'

const BATCH_SIZE = 20
const ITEM_HEIGHT = 60
const CONTAINER_HEIGHT = 400

const OPTIONS = {
  root: null,
  rootMargin: '0px 0px 200px 0px',
  threshold: 0,
}

const InfiniteVirtualScroll = () => {
  const [items, setItems] = useState<number[]>(Array.from({ length: BATCH_SIZE }, (_, i) => i))
  const [scrollTop, setScrollTop] = useState(0)
  const loaderRef = useRef<HTMLLIElement | null>(null)
  const scrollPending = useRef(false)

  const totalHeight = items.length * ITEM_HEIGHT
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT)
  const endIndex = Math.min(
    items.length - 1,
    startIndex + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT),
  )
  const visibleItems = items.slice(startIndex, endIndex + 1)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTopValue = e.currentTarget.scrollTop
    if (!scrollPending.current) {
      requestAnimationFrame(() => {
        setScrollTop(scrollTopValue)
        scrollPending.current = false
      })
      scrollPending.current = true
    }
  }

  const loadMore = () =>
    setItems((prev) => [...prev, ...Array.from({ length: BATCH_SIZE }, (_, i) => prev.length + i)])

  useEffect(() => {
    const loader = loaderRef.current
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore()
    }, OPTIONS)

    if (loader) observer.observe(loader)
    return () => {
      if (loader) observer.unobserve(loader)
    }
  }, [])

  return (
    <div
      style={{
        height: CONTAINER_HEIGHT,
      }}
      className="relative overflow-y-auto border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800"
      onScroll={handleScroll}
    >
      <ul
        style={{
          height: totalHeight,
        }}
        className="relative"
      >
        {visibleItems.map((item, index) => (
          <li
            key={item}
            style={{
              height: ITEM_HEIGHT,
              transform: `translateY(${(startIndex + index) * ITEM_HEIGHT}px)`,
            }}
            className="flex items-center absolute w-full px-4 border-b border-slate-300 dark:border-zinc-700"
          >
            Item {item}
          </li>
        ))}
        <li
          ref={loaderRef}
          style={{
            transform: `translateY(${items.length * ITEM_HEIGHT}px)`,
          }}
          className="absolute h-[1px] w-full"
        />
      </ul>
    </div>
  )
}

export default InfiniteVirtualScroll
