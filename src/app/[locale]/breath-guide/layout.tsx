import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeaderMini from '@/components/HeaderMini'
import FooterMini from '@/components/FooterMini'
import BreathGuide from './_components/BreathGuide'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools.breathGuide' })
  const path = 'breath-guide'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/${path}`,
      languages: {
        en: `/en/${path}`,
        ko: `/ko/${path}`,
      },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/${path}`,
    },
  }
}

const Layout = async ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) => {
  return (
    <>
      <HeaderMini titleKey="tools.breathGuide.title" themeDisabled />
      <main className="flex-1">
        <BreathGuide />
        {children}
        {modal}
      </main>
      <FooterMini />
    </>
  )
}

export default Layout
