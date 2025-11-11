import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const namespaces = ['common', 'tools', 'blog']

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (name) => [
        name,
        (await import(`../../messages/${locale}/${name}.json`)).default,
      ]),
    ),
  )

  return {
    locale,
    messages,
  }
})
