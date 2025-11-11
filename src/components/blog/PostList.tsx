import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getPostList } from '@/lib/post'
import { ClockIcon } from '@heroicons/react/24/outline'

interface Props {
  category?: string
}

const PostList = async ({ category }: Props) => {
  const t = await getTranslations('blog.category')
  const postList = await getPostList(category)
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {postList.map(({ url, title, category, dateString, readingMinutes }) => (
        <li key={url}>
          <Link
            href={url}
            aria-label={title}
            className="flex flex-col gap-4 justify-between size-full min-h-36 px-5 py-4 shadow border rounded-2xl border-slate-300 hover:border-slate-400 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <div>
              <span className="text-slate-700 dark:text-zinc-300 font-medium text-sm">
                {t(category)}
              </span>
              <h3 className="mt-1 text-slate-900 dark:text-zinc-100 font-bold">{title}</h3>
            </div>
            <div className="flex flex-wrap justify-between gap-x-2 text-slate-700 dark:text-zinc-300 text-xs">
              <span>{dateString}</span>
              <div className="flex flex-nowrap gap-x-1 items-center">
                <ClockIcon className="shrink-0 size-3" />
                {readingMinutes} min
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
