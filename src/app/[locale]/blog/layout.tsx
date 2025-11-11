import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Footer from '@/components/Footer'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const path = 'blog'

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
      {children}
      <Footer />
    </>
  )
}

export default Layout
