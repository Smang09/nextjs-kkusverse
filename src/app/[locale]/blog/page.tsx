import Header from '@/components/Header'
import Posts from '@/components/Posts'

const Page = async () => {
  return (
    <>
      <Header titleKey="blog.title" />
      <main className="max-w-300 w-full mx-auto flex-1 p-4 pb-12 sm:p-6">
        <Posts />
      </main>
    </>
  )
}

export default Page
