import { MDXRemote } from 'next-mdx-remote/rsc'
import { Post } from '@/lib/post'
import MDXComponents from './mdx'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'

interface Props {
  post: Post
}

const prettyCodeOptions: Options = {
  keepBackground: false,
  theme: {
    light: 'github-light',
    dark: 'nord',
  },
}

const PostBody = ({ post }: Props) => {
  const { content } = post
  return (
    <article className="text-slate-900 dark:text-zinc-100 mt-5 mb-10">
      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </article>
  )
}
export default PostBody
