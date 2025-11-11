import { XMarkIcon } from '@heroicons/react/24/solid'
import { BreathAnimation, BreathState, BreathStateKeys } from '../_types'
import { useTranslations } from 'next-intl'

interface Props {
  breathState: BreathState
  breathAnimation: BreathAnimation
  changeBreathState: (type: BreathStateKeys, value: number) => void
  changeBreathAnimation: (type: BreathAnimation) => void
  onClose: () => void
}

const BREATH_CONFIG_OPTIONS: { type: BreathStateKeys; min: number }[] = [
  { type: 'inhale', min: 1 },
  { type: 'hold', min: 0 },
  { type: 'exhale', min: 1 },
]

const BREATH_ANIMATION_OPTIONS: BreathAnimation[] = ['pulse', 'wave']

const SettingsPanel = ({
  breathState,
  breathAnimation,
  changeBreathState,
  changeBreathAnimation,
  onClose,
}: Props) => {
  const t = useTranslations('tools.breathGuide.settings')
  return (
    <div className="absolute bottom-0 left-20 flex flex-col w-[calc(100dvw-96px)] max-w-60 max-h-[calc(100dvh-68px)] p-6 border-1 border-slate-300 rounded-2xl bg-white text-black">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{t('title')}</h2>
        <button className="cursor-pointer" onClick={onClose}>
          <XMarkIcon className="size-6" />
        </button>
      </div>
      <div className="space-y-4 mt-5 overflow-auto">
        <div className="space-y-2">
          <h3 className="font-bold">{t('breathingDuration')}</h3>
          <ul className="space-y-3">
            {BREATH_CONFIG_OPTIONS.map(({ type, min }) => (
              <li key={type} className="flex justify-between items-center gap-4 flex-wrap">
                <label htmlFor={type} className="cursor-pointer">
                  {t(type)}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={type}
                    type="number"
                    inputMode="numeric"
                    min={min}
                    step={1}
                    className="w-15 px-1.5 py-0.5 border border-slate-300 rounded-md text-right"
                    value={Number.isNaN(breathState[type]) ? '' : breathState[type]}
                    onChange={(e) => {
                      const value = e.target.value
                      changeBreathState(type, value === '' ? NaN : Number(value))
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        changeBreathState(type, min)
                      }
                    }}
                  />
                  <span>{t('second')}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold">{t('animation')}</h3>
          <ul className="flex gap-5">
            {BREATH_ANIMATION_OPTIONS.map((type) => (
              <li key={type} className="flex items-center gap-2">
                <input
                  id={type}
                  type="radio"
                  value={type}
                  checked={breathAnimation === type}
                  onChange={() => changeBreathAnimation(type)}
                  className="appearance-none size-4 rounded-full border-3 border-slate-300 checked:bg-blue-500 cursor-pointer"
                />

                <label htmlFor={type} className="cursor-pointer">
                  {t(type)}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
