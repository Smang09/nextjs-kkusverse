import { getPostDetail, getPostList } from '@/lib/post'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getTranslations } from 'next-intl/server'
import PostHeader from '@/components/blog/PostHeader'
import PostBody from '@/components/blog/PostBody'

interface Props {
  params: Promise<{ category: string; name: string }>
}

export const generateStaticParams = async () => {
  const posts = await getPostList()
  return posts.map(({ category, name }) => ({ category, name }))
}

const Page = async ({ params }: Props) => {
  const { category, name } = await params
  const t = await getTranslations('blog.category')
  const post = await getPostDetail(category, name)

  if (!post) return notFound()

  return (
    <>
      <Header title={`${t(category)} | ${post.title}`} fixed />
      <main className="relative max-w-300 w-full mx-auto flex-1 px-4 pt-22 pb-12 sm:px-6">
        <PostHeader post={post} />
        <PostBody post={post} />
        <ScrollToTopButton />
      </main>
    </>
  )
}

export default Page
