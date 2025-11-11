import { Post } from '@/lib/post'
import { ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface Props {
  post: Post
}

const PostHeader = ({ post }: Props) => {
  const t = useTranslations('blog.category')
  const { category, title, desc, tags, dateString, readingMinutes } = post
  return (
    <header>
      <div className="mb-5 flex flex-wrap items-center gap-0.5 text-sm font-medium text-slate-700 dark:text-zinc-300">
        <Link href={`/blog/${category}`} className="hover:underline">
          {t(category)}
        </Link>
        <ChevronRightIcon className="size-3 shrink-0" />
        {title}
      </div>
      <div className="text-2xl font-bold mb-2 text-slate-900 dark:text-zinc-100">{title}</div>
      <p className="mb-8 leading-relaxed text-slate-700 dark:text-zinc-300 whitespace-pre-line">
        {desc}
      </p>
      <ul className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 rounded-full px-3 py-1 text-xs"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mb-4 gap-x-4 text-slate-700 dark:text-zinc-300 text-xs">
        <div>{dateString}</div>
        <div className="flex items-center gap-x-1.5">
          <ClockIcon className="shrink-0 size-4" />
          <div>{readingMinutes} min</div>
        </div>
      </div>
      <hr className="border-slate-300 dark:border-zinc-700" />
    </header>
  )
}

export default PostHeader
