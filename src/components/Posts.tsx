import CategoryList from '@/components/blog/CategoryList'
import PostList from '@/components/blog/PostList'

interface Props {
  category?: string
}

const Posts = ({ category }: Props) => {
  return (
    <section className="space-y-4">
      <CategoryList category={category} />
      <PostList category={category} />
    </section>
  )
}

export default Posts
