import { useTranslations } from 'next-intl'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import Logo from '@/assets/Logo'

interface Props {
  title?: string
  titleKey?: string
  fixed?: boolean
}

const Header = ({ title, titleKey, fixed }: Props) => {
  const t = useTranslations()
  return (
    <header
      className={`w-full flex justify-between items-center flex-wrap gap-4 py-3 px-4 sm:px-6 select-none z-1 ${
        fixed ? 'fixed backdrop-blur' : ''
      }`}
    >
      <Link href="/" className="flex items-center">
        <h1 className="flex items-center gap-2">
          <Logo className="fill-slate-900 dark:fill-white" />
          <span className="fill-slate-900 dark:text-white text-xl font-bold sm:text-2xl tracking-wide">
            KKUSVERSE
          </span>
          {title && <span className="sr-only">{title}</span>}
          {titleKey && <span className="sr-only">{t(titleKey)}</span>}
        </h1>
      </Link>
      <ThemeSwitch />
    </header>
  )
}

export default Header
