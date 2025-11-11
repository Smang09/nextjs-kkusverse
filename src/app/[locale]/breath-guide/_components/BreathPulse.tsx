import { useCallback, useId, useMemo } from 'react'
import { BreathState } from '../_types'
import useBreathAnimation from '../_hooks/useBreathAnimation'
import BreathProgress from './BreathProgress'

interface Props {
  breathState: BreathState
  isRunning: boolean
}

const MIN_SCALE = 0.3

const BreathPulse = ({ breathState, isRunning }: Props) => {
  const id = useId()
  const keyframesName = `breathCycle_${id}`
  const pulseKeyframesName = `breathCycle_pulse_${id}`

  const { inhale, exhale, hold } = breathState
  const total = inhale + exhale + hold * 2

  const { keyframes } = useBreathAnimation({
    breathState,
    isRunning,
    keyframesName,
    getTransformValue: useCallback(
      (percent: number) => {
        const inhaleEnd = (inhale / total) * 100
        const holdEnd = ((inhale + hold) / total) * 100
        return percent === inhaleEnd || percent === holdEnd ? `scale(1)` : `scale(${MIN_SCALE})`
      },
      [hold, inhale, total],
    ),
  })

  const pulseKeyframes = useMemo(() => {
    if (!isRunning) return ''

    const total = inhale + exhale + hold * 2
    const inhaleEnd = (inhale / total) * 100
    const holdEnd = ((inhale + hold) / total) * 100
    const exhaleEnd = ((inhale + hold + exhale) / total) * 100

    return `
      @keyframes ${pulseKeyframesName} {
        0% { transform: scale(1.5); opacity: 0; }
        ${inhaleEnd}% { transform: scale(1); opacity: 1; }
        ${holdEnd}% { transform: scale(1); opacity: 1; }
        ${exhaleEnd}% { transform: scale(1.5); opacity: 0; }
        100% { transform: scale(1.5); opacity: 0; }
      }
    `
  }, [exhale, hold, inhale, isRunning, pulseKeyframesName])

  return (
    <>
      {isRunning && (
        <style>
          {keyframes}
          {pulseKeyframes}
        </style>
      )}
      <div className="w-[min(75dvw,75dvh)] h-[min(75dvw,75dvh)] relative flex justify-center items-center">
        {isRunning && (
          <div
            className="border-1 border-white/10 size-full absolute rounded-full"
            style={{
              animation: `${pulseKeyframesName} ${total}s ease-in-out infinite`,
            }}
          />
        )}
        <div
          className="bg-white/30 size-full absolute rounded-full drop-shadow-2xl"
          style={{
            animation: isRunning ? `${keyframesName} ${total}s ease-in-out infinite` : 'none',
            transform: `scale(${MIN_SCALE})`,
          }}
        />
      </div>
      <div className="fixed top-0 left-0 w-full z-1">
        <BreathProgress breathState={breathState} isRunning={isRunning} />
      </div>
    </>
  )
}

export default BreathPulse
