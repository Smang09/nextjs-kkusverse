import '@/styles/globals.css'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import BottomSheetProvider from '@/providers/BottomSheetProvider'

const pretendard = localFont({
  src: '../../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })
  const host = process.env.NEXT_PUBLIC_BASE_URL as string

  return {
    metadataBase: new URL(host),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: '/en',
        ko: '/ko',
      },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/`,
    },
    other: {
      'naver-site-verification': '2441329a6fe86a2887fb66239fc4446b02d88098',
      'google-adsense-account': 'ca-pub-3109042814786748',
    },
  }
}

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning className="bg-white dark:bg-zinc-900">
      <body className={`${pretendard.variable} flex flex-col h-dvh bg-white dark:bg-zinc-900`}>
        <ThemeProvider attribute="class">
          <NextIntlClientProvider>
            {children}
            <BottomSheetProvider />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
