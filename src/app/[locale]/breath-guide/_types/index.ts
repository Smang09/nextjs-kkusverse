export type BreathState = {
  inhale: number
  exhale: number
  hold: number
}

export type BreathStateKeys = keyof BreathState
export type BreathAnimation = 'pulse' | 'wave'
