'use client'

import useTimer from '@/hooks/useTimer'
import { useTranslations } from 'next-intl'
import { useState, useRef, useEffect, useCallback } from 'react'

const ROWS = 10
const COLS = 18
const CELL_SIZE = 32
const GRID_GAP = 2
const DURATION_S = 120
const SUM = 10

const TenBlock = () => {
  const t = useTranslations('tools.10Block')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const gridRectRef = useRef<DOMRect | null>(null)

  const [values, setValues] = useState<number[]>([])
  const [collected, setCollected] = useState<boolean[]>(Array(ROWS * COLS).fill(false))
  const [score, setScore] = useState(0)
  const [isEnd, setIsEnd] = useState(false)

  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState<[number, number] | null>(null)
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null)

  const { isActive, remainingMS, progress, start } = useTimer(DURATION_S * 1000, () =>
    setIsEnd(true),
  )

  const totalSeconds = Math.ceil(remainingMS / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const randomize = () => {
    setValues(Array.from({ length: ROWS * COLS }, () => Math.ceil(Math.random() * 9)))
  }

  const beep = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }

    const ctx = audioCtxRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15)

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2)

    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  }

  const initDragging = () => {
    setStartPos(null)
    setCurrentPos(null)
    setIsDragging(false)
  }

  const startGame = () => {
    setIsEnd(false)
    setScore(0)
    setCollected(Array(ROWS * COLS).fill(false))
    initDragging()
    randomize()
    start()
  }

  const isSelected = (idx: number) => {
    if (!isDragging || !startPos || !currentPos) return false

    const r = Math.floor(idx / COLS)
    const c = idx % COLS
    const [r1, c1] = startPos
    const [r2, c2] = currentPos

    return (
      r >= Math.min(r1, r2) &&
      r <= Math.max(r1, r2) &&
      c >= Math.min(c1, c2) &&
      c <= Math.max(c1, c2) &&
      !collected[idx]
    )
  }

  const collectSelection = useCallback(() => {
    if (!startPos || !currentPos) return

    const [r1, c1] = startPos
    const [r2, c2] = currentPos
    const minR = Math.min(r1, r2)
    const maxR = Math.max(r1, r2)
    const minC = Math.min(c1, c2)
    const maxC = Math.max(c1, c2)

    const selectedIndices: number[] = []
    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        selectedIndices.push(r * COLS + c)
      }
    }
    const activeIndices = selectedIndices.filter((i) => !collected[i])
    if (activeIndices.length === 0) return

    const sum = activeIndices.reduce((acc, i) => acc + values[i], 0)
    if (sum !== SUM) return

    setCollected((prev) => prev.map((v, i) => (activeIndices.includes(i) ? true : v)))
    setScore((prev) => prev + activeIndices.length)
    beep()
  }, [collected, currentPos, startPos, values])

  const handlePointerDown = (row: number, col: number) => () => {
    const grid = gridRef.current
    if (!grid || !isActive) return

    gridRectRef.current = grid.getBoundingClientRect()
    setIsDragging(true)
    setStartPos([row, col])
    setCurrentPos([row, col])
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const gridRect = gridRectRef.current
    if (!isActive || !isDragging || !gridRect) return

    const { left, top } = gridRect
    const x = e.clientX - left
    const y = e.clientY - top

    const totalSize = CELL_SIZE + GRID_GAP

    const col = Math.floor((x + GRID_GAP / 2) / totalSize)
    const row = Math.floor((y + GRID_GAP / 2) / totalSize)

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      setCurrentPos([row, col])
    }
  }

  useEffect(() => {
    randomize()
  }, [])

  useEffect(() => {
    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return
      gridRef.current?.releasePointerCapture(e.pointerId)
      if (isActive) collectSelection()
      initDragging()
    }
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [collectSelection, isActive, isDragging])

  return (
    <div className="space-y-3">
      <div className="space-y-4 text-center">
        <h2 className="text-slate-800 dark:text-white text-4xl font-bold">{t('title')}</h2>
        <p className="text-slate-500 dark:text-zinc-300">{t('howTo')}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-9 text-slate-700 dark:text-white font-medium shrink-0">
          {`${minutes}:${String(seconds).padStart(2, '0')}`}
        </div>
        <div className="relative flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-indigo-500"
            style={{ width: `${(1 - progress) * 100}%` }}
          />
        </div>
        {!isEnd && (
          <button
            className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 cursor-pointer"
            onClick={startGame}
          >
            {isActive ? t('restart') : t('start')}
          </button>
        )}
      </div>

      <div
        ref={gridRef}
        className="relative grid w-fit mx-auto select-none touch-none"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
          gap: `${GRID_GAP}px`,
        }}
        onContextMenu={(e) => e.preventDefault()}
        {...{ onPointerMove: handlePointerMove }}
      >
        {values.map((value, idx) => {
          const row = Math.floor(idx / COLS)
          const col = idx % COLS
          const isCollected = collected[idx]
          return (
            <div
              key={idx}
              className={`
                flex items-center justify-center rounded text-lg dark:font-light transition 
                ${isCollected ? 'opacity-0 scale-150 ' : ''}
                ${
                  isSelected(idx)
                    ? 'bg-indigo-200 ring-2 ring-indigo-500 text-indigo-700 dark:bg-zinc-700 dark:text-white'
                    : 'bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-200'
                }
              `}
              style={{ width: CELL_SIZE, height: CELL_SIZE }}
              aria-hidden={isCollected}
              onPointerDown={handlePointerDown(row, col)}
            >
              <span>{value}</span>
            </div>
          )
        })}
        {isEnd && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 animate-slideDownBounce p-6">
            <div className="text-4xl font-extrabold text-white mb-6">{t('gameOver')}</div>
            <p className="text-lg text-slate-300 font-medium mb-2">{t('yourScore')}</p>
            <div className="text-6xl font-black text-white tracking-wider mb-8">{score}</div>
            <button
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full cursor-pointer"
              onClick={startGame}
            >
              {t('playAgain')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TenBlock
