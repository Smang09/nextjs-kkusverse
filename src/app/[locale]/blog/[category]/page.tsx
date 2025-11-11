import { getCategoryList } from '@/lib/post'
import Header from '@/components/Header'
import Posts from '@/components/Posts'

interface Props {
  params: Promise<{ category: string }>
}

export const generateStaticParams = () => {
  const CategoryList = getCategoryList()
  return CategoryList.map(({ name }) => ({ category: name }))
}

const Page = async ({ params }: Props) => {
  const { category } = await params
  return (
    <>
      <Header titleKey="blog.title" />
      <main className="max-w-300 w-full mx-auto flex-1 p-4 pb-12 sm:p-6">
        <Posts category={category} />
      </main>
    </>
  )
}

export default Page
