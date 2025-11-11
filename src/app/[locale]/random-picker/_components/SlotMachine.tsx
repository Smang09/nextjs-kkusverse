'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect, useCallback } from 'react'

interface Props {
  items: string[]
}

const SLOT_HEIGHT = 45
const VISIBLE_COUNT = 3
const SPIN_DURATION_MS = 3000
const MAX_SPEED = 500
const MIN_SPEED = 50

const SlotMachine = ({ items }: Props) => {
  const t = useTranslations('tools.randomPicker')
  const total = items.length

  const containerRef = useRef<HTMLUListElement>(null)
  const animationId = useRef<number | null>(null)
  const startTime = useRef<number | null>(null)
  const currentOffset = useRef<number>(0)

  const [isSpinning, setIsSpinning] = useState(false)

  const loopHeight = total * SLOT_HEIGHT
  const centerIndex = Math.floor(VISIBLE_COUNT / 2)

  const updatePosition = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${offset}px)`
    }
  }

  const stopSpin = useCallback(() => {
    const selected = Math.floor(Math.random() * total)

    let target = (selected + total) * SLOT_HEIGHT - centerIndex * SLOT_HEIGHT
    if (target <= currentOffset.current) {
      target += loopHeight
    }

    let lastTime: number | null = null

    const animate = (timestamp: number) => {
      if (!lastTime) {
        lastTime = timestamp
      }

      const deltaTime = (timestamp - lastTime) / 1000
      lastTime = timestamp

      const distance = target - currentOffset.current

      if (distance <= 0.5) {
        currentOffset.current = target % loopHeight
        updatePosition(currentOffset.current)
        setIsSpinning(false)
        return
      }

      const speed = Math.min(Math.max(MIN_SPEED, distance * 3), MAX_SPEED)
      const move = Math.min(speed * deltaTime, distance)

      currentOffset.current += move
      updatePosition(currentOffset.current)

      animationId.current = requestAnimationFrame(animate)
    }

    animationId.current = requestAnimationFrame(animate)
  }, [centerIndex, loopHeight, total])

  const spin = useCallback(
    (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp
      }

      const elapsed = timestamp - startTime.current
      if (elapsed < SPIN_DURATION_MS) {
        currentOffset.current = ((elapsed / 1000) * MAX_SPEED) % loopHeight
        updatePosition(currentOffset.current)
        animationId.current = requestAnimationFrame(spin)
      } else {
        stopSpin()
      }
    },
    [loopHeight, stopSpin],
  )

  const startSpin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    startTime.current = null
    animationId.current = requestAnimationFrame(spin)
  }

  useEffect(() => {
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [])

  return (
    <>
      <div
        className="relative overflow-hidden border rounded-xl border-slate-300 dark:border-zinc-700"
        style={{ height: SLOT_HEIGHT * VISIBLE_COUNT }}
      >
        <ul
          ref={containerRef}
          className="absolute top-0 left-0 right-0"
          style={{ height: SLOT_HEIGHT * total * 3 }}
        >
          {Array(3)
            .fill(items)
            .flat()
            .map((item, idx) => (
              <li
                key={idx}
                className="flex justify-center items-center px-4"
                style={{ height: SLOT_HEIGHT }}
              >
                <span className="text-xl font-semibold truncate">{item}</span>
              </li>
            ))}
        </ul>
        <div
          className="absolute left-0 right-0 border-4 border-blue-500 rounded-xl"
          style={{ top: SLOT_HEIGHT * centerIndex, height: SLOT_HEIGHT }}
        />
      </div>
      <button
        className={`mt-4 w-full py-2 px-4 rounded-xl text-white font-semibold border border-transparent ${
          isSpinning
            ? 'bg-slate-300 dark:bg-zinc-700 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
        }`}
        disabled={isSpinning}
        onClick={startSpin}
      >
        {isSpinning ? t('picker.inProgress') : t('picker.start')}
      </button>
    </>
  )
}

export default SlotMachine
