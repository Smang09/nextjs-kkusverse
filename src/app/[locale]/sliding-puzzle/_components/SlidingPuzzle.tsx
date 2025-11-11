'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect, useCallback } from 'react'
import CustomSelect from '@/components/ui/CustomSelect'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

type Tile = {
  id: number
  row: number
  col: number
}

const DEFAULT_SIZE = 3
const SIZE_OPTIONS = [3, 4, 5]

const DIRS = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
]

const generateTiles = (size: number): Tile[] =>
  Array.from({ length: size * size }, (_, i) => ({
    id: (i + 1) % (size * size),
    row: Math.floor(i / size),
    col: i % size,
  }))

const shuffleTiles = (tiles: Tile[], size: number): Tile[] => {
  const moves = Math.floor(10 * Math.pow(size, 3))

  let tilesCopy = tiles.map((t) => ({ ...t }))
  let empty = tilesCopy.find((t) => t.id === 0)!
  let prev: Tile | null = null

  const neighbors = (tile: Tile) =>
    DIRS.map(({ dr, dc }) =>
      tilesCopy.find((t) => t.row === tile.row + dr && t.col === tile.col + dc),
    ).filter(Boolean) as Tile[]

  for (let i = 0; i < moves; i++) {
    const possible = neighbors(empty).filter((t) => t !== prev)
    const chosen = possible[Math.floor(Math.random() * possible.length)]

    tilesCopy = tilesCopy.map((t) =>
      t.id === empty.id
        ? { ...t, row: chosen.row, col: chosen.col }
        : t.id === chosen.id
        ? { ...t, row: empty.row, col: empty.col }
        : t,
    )

    empty = tilesCopy.find((t) => t.id === 0)!
    prev = tilesCopy.find((t) => t.id === chosen.id)!
  }

  return tilesCopy
}

const SlidingPuzzle = () => {
  const t = useTranslations('tools.slidingPuzzle')
  const [tiles, setTiles] = useState<Tile[]>(() => generateTiles(DEFAULT_SIZE))
  const [gridSize, setGridSize] = useState(DEFAULT_SIZE)
  const [isSolved, setIsSolved] = useState(false)
  const [moves, setMoves] = useState(0)

  const moveTile = useCallback(
    (id: number) => {
      if (id === 0 || isSolved) return

      const empty = tiles.find((t) => t.id === 0)!
      const tile = tiles.find((t) => t.id === id)!
      const isNeighbor =
        (tile.row === empty.row && Math.abs(tile.col - empty.col) === 1) ||
        (tile.col === empty.col && Math.abs(tile.row - empty.row) === 1)

      if (!isNeighbor) return

      const newTiles = tiles.map((t) => {
        if (t.id === id) return { ...t, row: empty.row, col: empty.col }
        if (t.id === 0) return { ...t, row: tile.row, col: tile.col }
        return t
      })

      setMoves((prev) => prev + 1)
      setTiles(newTiles)
      setIsSolved(
        newTiles.every((t) =>
          t.id === 0
            ? t.row === gridSize - 1 && t.col === gridSize - 1
            : t.row === Math.floor((t.id - 1) / gridSize) && t.col === (t.id - 1) % gridSize,
        ),
      )
    },
    [gridSize, isSolved, tiles],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const empty = tiles.find((t) => t.id === 0)!
      let target: Tile | null = null

      switch (e.key) {
        case 'ArrowUp':
          target = tiles.find((t) => t.row === empty.row + 1 && t.col === empty.col) || null
          break
        case 'ArrowDown':
          target = tiles.find((t) => t.row === empty.row - 1 && t.col === empty.col) || null
          break
        case 'ArrowLeft':
          target = tiles.find((t) => t.row === empty.row && t.col === empty.col + 1) || null
          break
        case 'ArrowRight':
          target = tiles.find((t) => t.row === empty.row && t.col === empty.col - 1) || null
          break
      }

      if (target) moveTile(target.id)
    },
    [tiles, moveTile],
  )

  const changePuzzleSize = (size: number) => {
    setGridSize(size)
    setTiles(generateTiles(size))
    setIsSolved(false)
    setMoves(0)
  }

  const shufflePuzzle = () => {
    setTiles(shuffleTiles(tiles, gridSize))
    setIsSolved(false)
    setMoves(0)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="w-full text-center">
      <div className="space-y-4 mb-6">
        <h2 className="text-slate-800 dark:text-white text-4xl font-bold">{t('title')}</h2>
        <p className="text-slate-500 dark:text-zinc-300">{t('howTo')}</p>
      </div>
      <div className="max-w-sm mx-auto">
        <div className="flex items-center gap-4 justify-between flex-wrap mb-3">
          <CustomSelect
            label={t('puzzleSize')}
            value={gridSize}
            options={SIZE_OPTIONS.map((n) => ({ label: `${n} x ${n}`, value: n }))}
            onChange={changePuzzleSize}
          />
          <span className="text-slate-500 dark:text-zinc-300">
            {t('moves')}: {moves}
          </span>
        </div>
        <div className="relative aspect-square overflow-hidden mb-6">
          {tiles.map(({ id, row, col }) => {
            const tileRow = id === 0 ? gridSize - 1 : Math.floor((id - 1) / gridSize)
            const tileCol = id === 0 ? gridSize - 1 : (id - 1) % gridSize
            const isEven = (tileRow + tileCol) % 2 === 0
            return (
              <div
                key={id}
                onClick={() => moveTile(id)}
                style={{
                  width: `${100 / gridSize}%`,
                  height: `${100 / gridSize}%`,
                  transform: `translate(${col * 100}%, ${row * 100}%)`,
                }}
                className={`absolute flex items-center justify-center font-medium border border-white dark:border-zinc-900 select-none rounded-lg transition 
                ${
                  id === 0
                    ? isSolved
                      ? 'bg-indigo-600'
                      : 'bg-transparent'
                    : `${isEven ? 'bg-slate-200 dark:bg-zinc-600' : 'bg-slate-300 dark:bg-zinc-700'}
                     text-slate-800 dark:text-white cursor-pointer`
                } ${gridSize === 3 ? 'text-3xl' : 'text-xl'}
                `}
              >
                {isSolved && id === 0 ? (
                  <CheckBadgeIcon className="size-[40%] text-white" />
                ) : id !== 0 ? (
                  id
                ) : (
                  ''
                )}
              </div>
            )
          })}
        </div>
        <button
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full cursor-pointer"
          onClick={shufflePuzzle}
        >
          {isSolved ? t('playAgain') : t('shuffle')}
        </button>
      </div>
    </div>
  )
}

export default SlidingPuzzle
