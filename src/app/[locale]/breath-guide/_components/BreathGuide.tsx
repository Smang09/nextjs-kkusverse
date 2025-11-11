'use client'

import React, { useCallback, useState } from 'react'
import {
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid'
import BreathPulse from './BreathPulse'
import SettingsPanel from './SettingsPanel'
import { BreathAnimation, BreathState, BreathStateKeys } from '../_types'
import BreathWave from './BreathWave'
import IconButton from '@/components/ui/IconButton'
import { usePathname, useRouter } from 'next/navigation'

const DEFAULT_BREATH_STATE: BreathState = {
  inhale: 4,
  hold: 7,
  exhale: 8,
}

const DEFAULT_BREATH_ANIMATION: BreathAnimation = 'pulse'
const HELP_URL = 'breath-guide/help'

const BreathGuide = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isHelpOpen = pathname.endsWith(HELP_URL)

  const [breathState, setBreathState] = useState(DEFAULT_BREATH_STATE)
  const [breathAnimation, setBreathAnimation] = useState<BreathAnimation>(DEFAULT_BREATH_ANIMATION)

  const [isRunning, setIsRunning] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const changeBreathState = useCallback((type: BreathStateKeys, value: number) => {
    setIsRunning(false)
    setBreathState((prev) => ({ ...prev, [type]: value }))
  }, [])

  const changeBreathAnimation = useCallback((type: BreathAnimation) => {
    setBreathAnimation(type)
  }, [])

  const renderBreathAnimation = () => {
    const commonProps = { breathState, isRunning }
    switch (breathAnimation) {
      case 'pulse':
        return <BreathPulse {...commonProps} />
      case 'wave':
        return <BreathWave {...commonProps} />
      default:
        return null
    }
  }

  const toggleRunning = () => setIsRunning((prev) => !prev)

  const closeHelp = () => router.back()
  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false)
  }, [])

  const toggleHelp = () => {
    if (isSettingsOpen) closeSettings()
    if (isHelpOpen) closeHelp()
    else router.push(HELP_URL)
  }

  const toggleSettings = () => {
    if (isHelpOpen) closeHelp()
    setIsSettingsOpen((prev) => !prev)
  }

  return (
    <div className="bg-gradient-to-b from-[#5B4C97] to-[#1C3CA1] relative flex items-center justify-center h-full overflow-hidden">
      {renderBreathAnimation()}
      <div className="fixed bottom-4 left-0 px-4 flex flex-col gap-2 z-1 text-black/90">
        <IconButton isActive={isHelpOpen} ariaLabel="help" onClick={toggleHelp}>
          <QuestionMarkCircleIcon className="size-6" />
        </IconButton>
        <IconButton isActive={isRunning} ariaLabel="run" onClick={toggleRunning}>
          {isRunning ? <PauseIcon className="size-6" /> : <PlayIcon className="size-6" />}
        </IconButton>
        <IconButton isActive={isSettingsOpen} ariaLabel="settings" onClick={toggleSettings}>
          <Cog6ToothIcon className="size-6" />
        </IconButton>
        {isSettingsOpen && (
          <SettingsPanel
            breathState={breathState}
            breathAnimation={breathAnimation}
            changeBreathState={changeBreathState}
            changeBreathAnimation={changeBreathAnimation}
            onClose={closeSettings}
          />
        )}
      </div>
    </div>
  )
}

export default BreathGuide
