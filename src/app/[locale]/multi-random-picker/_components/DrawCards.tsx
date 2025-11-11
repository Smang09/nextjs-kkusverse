'use client'

import { useTranslations } from 'next-intl'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

interface Props {
  items: string[]
  count: number
  excludeUsed: boolean
}

type DrawStatus = 'ready' | 'drawing' | 'finished'

const DURATION_MS = 2000
const FAST_INTERVAL_MS = 100
const SLOW_STEPS = 10
const SLOW_START_INTERVAL_MS = 100
const SLOW_END_INTERVAL_MS = 400

const pickRandomMulti = (items: number[], count: number) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(count, copy.length))
}

const DrawCards = ({ items, count, excludeUsed }: Props) => {
  const t = useTranslations('tools.randomPicker')

  const animationId = useRef<number | null>(null)
  const availableIndicesRef = useRef<number[]>([])

  const [drawStatus, setDrawStatus] = useState<DrawStatus>('ready')
  const [current, setCurrent] = useState<number[]>([])
  const [drawn, setDrawn] = useState<number[]>([])

  const drawnSet = useMemo(() => new Set(drawn), [drawn])
  const currentSet = useMemo(() => new Set(current), [current])

  const allIndices = items.map((_, i) => i)
  const availableIndices = useMemo(
    () => (excludeUsed ? allIndices.filter((i) => !drawnSet.has(i)) : allIndices),
    [allIndices, drawnSet, excludeUsed],
  )
  const isAllDrawn = availableIndices.length <= count

  const stopDraw = useCallback(() => {
    let lastTime: number | null = null
    let step = 1

    const animate = (timestamp: number) => {
      if (lastTime === null) {
        lastTime = timestamp
      }

      const interval =
        SLOW_START_INTERVAL_MS +
        ((SLOW_END_INTERVAL_MS - SLOW_START_INTERVAL_MS) / SLOW_STEPS) * (step - 1)

      if (timestamp - lastTime >= interval) {
        setCurrent(pickRandomMulti(availableIndicesRef.current, count))
        lastTime = timestamp
        step += 1
      }

      if (step <= SLOW_STEPS) {
        animationId.current = requestAnimationFrame(animate)
      } else {
        setDrawStatus('finished')
      }
    }

    animationId.current = requestAnimationFrame(animate)
  }, [count])

  const startDraw = useCallback(() => {
    let startTime: number | null = null
    let lastTime: number | null = null

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }

      if (timestamp - startTime < DURATION_MS) {
        if (lastTime === null) {
          lastTime = timestamp
        }

        if (timestamp - lastTime >= FAST_INTERVAL_MS) {
          setCurrent(pickRandomMulti(availableIndicesRef.current, count))
          lastTime = timestamp
        }
        animationId.current = requestAnimationFrame(animate)
      } else {
        stopDraw()
      }
    }

    setDrawStatus('drawing')
    animationId.current = requestAnimationFrame(animate)
  }, [count, stopDraw])

  const tryDraw = () => {
    if (drawStatus === 'drawing' || isAllDrawn) return

    if (excludeUsed) {
      const newDrawn = [...drawn, ...current]
      setDrawn(newDrawn)
      if (items.length - newDrawn.length <= count) return
    }

    startDraw()
  }

  useEffect(() => {
    availableIndicesRef.current = availableIndices
  }, [availableIndices])

  useEffect(() => {
    return () => {
      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [])

  return (
    <div className="text-center">
      <ul className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]">
        {items.map((item, idx) => {
          const isUsed = excludeUsed && drawnSet.has(idx)
          const isCurrent = !isUsed && currentSet.has(idx)
          const isFinished = drawStatus === 'finished'
          return (
            <li
              key={idx}
              className={`
                flex items-center justify-center aspect-square p-4 rounded-xl shadow
                ${
                  isCurrent
                    ? 'border-2 border-blue-500'
                    : 'border-1 border-slate-300 dark:border-zinc-700'
                }
                ${isFinished && isCurrent ? 'border-4 animate-pulse' : ''}
                ${isUsed ? 'opacity-0' : ''}
              `}
            >
              <span className="truncate">{item}</span>
            </li>
          )
        })}
      </ul>
      <button
        className={`
          mt-8 w-full max-w-md py-2 px-4 rounded-xl border border-transparent text-white font-semibold
          ${
            drawStatus === 'drawing' || isAllDrawn
              ? 'bg-slate-300 dark:bg-zinc-700 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
          }
        `}
        disabled={drawStatus === 'drawing' || isAllDrawn}
        onClick={tryDraw}
      >
        {drawStatus === 'drawing'
          ? t('picker.inProgress')
          : isAllDrawn
          ? t('picker.finished')
          : t('picker.start')}
      </button>
    </div>
  )
}

export default DrawCards
