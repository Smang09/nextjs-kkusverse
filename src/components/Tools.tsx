import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'

const LINKS = [
  { name: 'breathGuide', link: '/breath-guide' },
  { name: 'randomPicker', link: '/random-picker' },
  { name: 'multiRandomPicker', link: '/multi-random-picker' },
  { name: 'pomodoroTimer', link: '/pomodoro-timer' },
  { name: '10Block', link: '/10-block' },
  { name: 'slidingPuzzle', link: '/sliding-puzzle' },
]

const Tools = () => {
  const t = useTranslations('tools')
  return (
    <section>
      <h2 className="text-slate-900 dark:text-white font-bold mb-2">Tools</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {LINKS.map(({ name, link }, idx) => (
          <li key={idx}>
            <Link
              href={link}
              aria-label={t(`${name}.title`)}
              className="flex justify-between items-center gap-4 size-full p-5 border rounded-2xl shadow border-slate-300 hover:border-slate-400 dark:border-zinc-700 dark:hover:border-zinc-600"
            >
              <h2 className="text-slate-900 dark:text-zinc-100 font-bold">{t(`${name}.title`)}</h2>
              <ArrowRightCircleIcon className="size-7 shrink-0 fill-slate-800 dark:fill-zinc-100" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tools
