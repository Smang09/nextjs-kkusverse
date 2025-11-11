import Logo from '@/assets/Logo'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

interface Props {
  titleKey?: string
  themeDisabled?: boolean
}

const HeaderMini = ({ titleKey, themeDisabled }: Props) => {
  const t = useTranslations()
  return (
    <header className="fixed top-0 left-0 flex items-center justify-between w-full h-12 px-4 z-1 select-none backdrop-blur">
      <h1>
        <Link href="/" className="flex items-start gap-2">
          <Logo
            className={`size-5 ${themeDisabled ? 'fill-black' : 'fill-slate-900 dark:fill-white'} `}
          />
          <span
            className={`text-sm font-bold tracking-wide ${
              themeDisabled ? 'text-black' : 'text-slate-900 dark:text-white'
            }`}
          >
            KKUSVERSE
          </span>
          {titleKey && <span className="sr-only">{t(titleKey)}</span>}
        </Link>
      </h1>
      {!themeDisabled && <ThemeSwitch />}
    </header>
  )
}

export default HeaderMini
