import { useCallback, useId } from 'react'
import { BreathState } from '../_types'
import useBreathAnimation from '../_hooks/useBreathAnimation'
import BreathProgress from './BreathProgress'

interface Props {
  breathState: BreathState
  isRunning: boolean
}

const MIN_Y = 0.2

const BreathWave = ({ breathState, isRunning }: Props) => {
  const id = useId()
  const keyframesName = `breathCycle_${id}`

  const { inhale, exhale, hold } = breathState
  const total = inhale + exhale + hold * 2

  const getTransformValue = useCallback(
    (percent: number) => {
      const inhaleEnd = (inhale / total) * 100
      const holdEnd = ((inhale + hold) / total) * 100
      return percent === inhaleEnd || percent === holdEnd
        ? `translateY(0)`
        : `translateY(${(1 - MIN_Y) * 100}%)`
    },
    [hold, inhale, total],
  )

  const { keyframes } = useBreathAnimation({
    breathState,
    isRunning,
    keyframesName,
    getTransformValue,
  })

  return (
    <>
      {isRunning && <style>{keyframes}</style>}
      <div
        className="relative w-full h-dvh"
        style={{
          animation: isRunning ? `${keyframesName} ${total}s ease-in-out infinite` : 'none',
          transform: `translateY(${(1 - MIN_Y) * 100}%)`,
        }}
      >
        <svg viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g>
            <use
              href="#wave"
              x="48"
              y="0"
              className="fill-white/70 animate-[wave_7s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-2s]"
            />
            <use
              href="#wave"
              x="48"
              y="3"
              className="fill-white/50 animate-[wave_10s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-3s]"
            />
            <use
              href="#wave"
              x="48"
              y="5"
              className="fill-white/30 animate-[wave_13s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-4s]"
            />
            <use
              href="#wave"
              x="48"
              y="7"
              className="fill-white animate-[wave_20s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-5s]"
            />
          </g>
        </svg>
        <div className="size-full bg-white" />
      </div>
      <div className="fixed top-0 left-0 w-full z-1">
        <BreathProgress breathState={breathState} isRunning={isRunning} />
      </div>
    </>
  )
}

export default BreathWave
