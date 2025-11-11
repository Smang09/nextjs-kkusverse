import type { Metadata } from 'next'
import { getPostDetail } from '@/lib/post'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; category: string; name: string }>
}): Promise<Metadata> => {
  const { locale, category, name } = await params
  const post = await getPostDetail(category, name)
  const path = post?.url

  return {
    title: post?.title,
    description: post?.desc,
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
  return <>{children}</>
}

export default Layout
