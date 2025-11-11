import { BreathState } from '../_types'

interface Props {
  breathState: BreathState
  isRunning: boolean
}

const BreathProgress = ({ breathState, isRunning }: Props) => {
  const { inhale, exhale, hold } = breathState
  const total = inhale + exhale + hold * 2

  const inhaleRatio = (inhale / total) * 100
  const holdRatio = (hold / total) * 100
  const exhaleRatio = (exhale / total) * 100

  return (
    <div
      className="relative w-full h-1 flex"
      style={{
        animation: isRunning ? `clipProgress ${total}s linear infinite` : 'none',
        clipPath: 'inset(0 100% 0 0)',
      }}
    >
      <div className="bg-white" style={{ width: `${inhaleRatio}%` }} />
      <div className="bg-white/15" style={{ width: `${holdRatio}%` }} />
      <div className="bg-white" style={{ width: `${exhaleRatio}%` }} />
      <div className="bg-white/15" style={{ width: `${holdRatio}%` }} />
    </div>
  )
}

export default BreathProgress
