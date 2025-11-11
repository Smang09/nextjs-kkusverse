import { MetadataRoute } from 'next'
import { Locale } from 'next-intl'
import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getPostList } from '@/lib/post'

const host = process.env.NEXT_PUBLIC_BASE_URL as string

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const postList = await getPostList()

  const PATHS = [
    '/',
    '/blog',
    '/breath-guide',
    '/breath-guide/help',
    '/random-picker',
    '/multi-random-picker',
    '/pomodoro-timer',
    '/10-block',
    '/sliding-puzzle',
  ]

  const staticEntries = PATHS.flatMap((path) => getEntries(path))
  const blogEntries = postList.flatMap(({ url }) => getEntries(url))

  return [...staticEntries, ...blogEntries]
}

type Href = Parameters<typeof getPathname>[0]['href']

const getEntries = (href: Href) => {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
    },
  }))
}

const getUrl = (href: Href, locale: Locale) => {
  const pathname = getPathname({ locale, href })
  return host + pathname
}

export default sitemap
