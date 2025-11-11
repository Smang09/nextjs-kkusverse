'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowPathIcon, Cog6ToothIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import useScrollIntoView from '@/hooks/useScrollIntoView'

type Mode = 'focus' | 'shortBreak' | 'longBreak'
type Setting = Mode | 'cycle'

const MODES: Mode[] = ['focus', 'shortBreak', 'longBreak']
const SETTINGS: Setting[] = ['focus', 'shortBreak', 'longBreak', 'cycle']

const DEFAULT_SETTINGS = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  cycle: 4,
}

const Timer = () => {
  const t = useTranslations('tools.pomodoroTimer.settings')
  const [currentMode, setCurrentMode] = useState<Mode>('focus')
  const [settings, setSettings] = useState<{ [key in Setting]: number }>(DEFAULT_SETTINGS)
  const [isActive, setIsActive] = useState(false)
  const [completed, setCompleted] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(settings.focus * 60)
  const [isAlert, setIsAlert] = useState(false)
  const [isOpenSettings, setIsOpenSettings] = useState(false)

  const timerRef = useRef<NodeJS.Timeout>(undefined)
  const cycleRef = useRef(0)
  const settingsRef = useScrollIntoView<HTMLUListElement>(isOpenSettings)

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')

  const changeMode = (mode: Mode) => {
    setIsActive(false)
    setCurrentMode(mode)
    setSecondsLeft(settings[mode] * 60)
    setIsAlert(false)
  }

  const updateSetting = (name: Setting, value: number) => {
    setIsAlert(false)
    setSettings((prev) => ({ ...prev, [name]: value }))
    if (name === currentMode) setSecondsLeft(value * 60)
  }

  const controlButtons = [
    {
      name: 'reset',
      className:
        'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800',
      icon: ArrowPathIcon,
      onClick: () => {
        changeMode('focus')
        setCompleted(0)
        cycleRef.current = 0
        setIsAlert(false)
      },
    },
    isActive
      ? {
          name: 'pause',
          className:
            'border-transparent bg-slate-800 text-white hover:bg-slate-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100',
          icon: PauseIcon,
          onClick: () => setIsActive(false),
        }
      : {
          name: 'start',
          className:
            'border-transparent bg-slate-800 text-white hover:bg-slate-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100',
          icon: PlayIcon,
          onClick: () => {
            setIsActive(true)
            setIsAlert(false)
          },
        },
    {
      name: 'settings',
      className:
        'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800',
      icon: Cog6ToothIcon,
      onClick: () => setIsOpenSettings((prev) => !prev),
    },
  ]

  useEffect(() => {
    if (isActive) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [isActive])

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsActive(false)
      clearInterval(timerRef.current)

      if (currentMode === 'focus') {
        setIsAlert(true)
        setCompleted((prev) => prev + 1)
        cycleRef.current++
      }

      const nextMode: Mode =
        currentMode === 'focus'
          ? cycleRef.current % settings.cycle === 0
            ? 'longBreak'
            : 'shortBreak'
          : 'focus'

      setCurrentMode(nextMode)
      setSecondsLeft(settings[nextMode] * 60)
    }
  }, [currentMode, secondsLeft, settings])

  return (
    <div className="h-full flex flex-col items-center px-4 pt-15 pb-20">
      <div className="flex space-x-2 mb-8">
        {Array.from({ length: settings.cycle }).map((_, i) => (
          <div
            key={i}
            className={`size-5 rounded-full border transition ${
              i < completed
                ? 'border-transparent bg-slate-800 dark:bg-white'
                : 'border-slate-300 dark:border-zinc-700'
            }`}
          />
        ))}
      </div>

      <div className="flex space-x-2">
        {MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => changeMode(mode)}
            className={`w-20 p-1.5 border rounded text-sm font-medium cursor-pointer break-words transition shadow ${
              currentMode === mode
                ? 'border-transparent bg-slate-800 text-white dark:bg-white dark:text-zinc-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {t(mode)}
          </button>
        ))}
      </div>

      <div
        className={`flex items-center flex-1 pb-10 font-bold tracking-wide my-20 text-8xl md:text-9xl text-slate-800 dark:text-white ${
          isAlert ? 'animate-pulse' : ''
        }`}
      >
        {minutes}:{secs}
      </div>

      <div className="flex space-x-6">
        {controlButtons.map(({ name, className, icon: Icon, onClick }) => (
          <button
            key={name}
            onClick={onClick}
            aria-label={name}
            className={`flex items-center justify-center size-15 border rounded-full cursor-pointer transition shadow ${className}`}
          >
            <Icon className="size-8" />
          </button>
        ))}
      </div>

      {isOpenSettings && (
        <div className="w-full max-w-xs mt-10 p-6 space-y-4 shadow border rounded-2xl text-slate-700 border-slate-300 dark:text-white dark:border-zinc-700">
          <div className="text-lg font-semibold mb-4">{t('title')}</div>
          <ul ref={settingsRef} className="space-y-2 text-sm font-medium">
            {SETTINGS.map((name) => (
              <li key={name} className="flex items-center justify-between space-x-4">
                <label htmlFor={name} className="shrink-0">
                  {t(name)}
                </label>
                <div className="flex items-center w-30 space-x-2">
                  <input
                    id={name}
                    type="number"
                    inputMode="numeric"
                    value={settings[name]}
                    min={1}
                    onChange={(e) => updateSetting(name, Number(e.target.value))}
                    className="w-full px-2 py-1 border rounded-md text-right border-slate-300 dark:border-zinc-700"
                  />
                  <span>{name === 'cycle' ? t('count') : t('minute')}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Timer
