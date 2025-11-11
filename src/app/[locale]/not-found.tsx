import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const NotFound = () => {
  const t = useTranslations('common.notFound')
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('title')}</h2>
        <p className="text-slate-800 dark:text-zinc-300 mb-8">{t('description')}</p>
        <Link
          href="/"
          className="px-4 py-2 bg-slate-700 rounded-full text-white hover:bg-slate-800 text-sm font-medium"
        >
          {t('goHome')}
        </Link>
      </main>
      <Footer />
    </>
  )
}

export default NotFound
