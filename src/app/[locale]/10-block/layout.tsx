import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeaderMini from '@/components/HeaderMini'
import FooterMini from '@/components/FooterMini'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools.10Block' })
  const path = '10-block'

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
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <HeaderMini titleKey="tools.10Block.title" />
      <main className="flex-1">{children}</main>
      <FooterMini />
    </>
  )
}

export default Layout
