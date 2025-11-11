import { useMemo } from 'react'
import { BreathState } from '../_types'

interface Props {
  breathState: BreathState
  isRunning: boolean
  keyframesName: string
  getTransformValue: (progressPercent: number) => string
}

const useBreathAnimation = ({
  breathState,
  isRunning,
  keyframesName,
  getTransformValue,
}: Props) => {
  const { inhale, exhale, hold } = breathState

  const keyframes = useMemo(() => {
    if (!isRunning) return ''

    const total = inhale + exhale + hold * 2
    const inhaleEnd = (inhale / total) * 100
    const holdEnd = ((inhale + hold) / total) * 100
    const exhaleEnd = ((inhale + hold + exhale) / total) * 100

    return `
      @keyframes ${keyframesName} {
        0% { transform: ${getTransformValue(0)}; }
        ${inhaleEnd}% { transform: ${getTransformValue(inhaleEnd)}; }
        ${holdEnd}% { transform: ${getTransformValue(holdEnd)}; }
        ${exhaleEnd}% { transform: ${getTransformValue(exhaleEnd)}; }
        100% { transform: ${getTransformValue(100)}; }
      }
    `
  }, [isRunning, inhale, exhale, hold, keyframesName, getTransformValue])

  return { keyframes }
}

export default useBreathAnimation
