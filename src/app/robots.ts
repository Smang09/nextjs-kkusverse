import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  const host = process.env.NEXT_PUBLIC_BASE_URL as string
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${host}/sitemap.xml`,
  }
}

export default robots
