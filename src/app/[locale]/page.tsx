import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Posts from '@/components/Posts'
import Tools from '@/components/Tools'

const Page = async () => {
  return (
    <>
      <Header />
      <main className="space-y-8 max-w-300 w-full mx-auto flex-1 p-4 pb-12 sm:p-6">
        <Posts />
        <Tools />
      </main>
      <Footer />
    </>
  )
}

export default Page
